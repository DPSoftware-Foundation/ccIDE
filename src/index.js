const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;

// override prompt command
window.prompt = function(promptText, defaultValue) {
    return ipc.sendSync("prompt", promptText, defaultValue);
};

window.onerror = function (message, source, lineno, colno, error) {
    ipc.send("error", message)
    return true; // Prevents the default browser error handling
};

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

console.originalLog = console.log;

console.log = function (...args) {
    ipc.send("update-log-status", ...args)
    console.originalLog(...args)
    document.getElementById("loadingstatus").textContent = args.join(' ');
};

console.log("Importing module...")
const fs = require('fs');
const path = require('path');
const { loadperipheral, scanindex, isBlocksFolderEmpty, downloadBlocks } = require("./blocksmanager");
const Blockly = require('blockly');
const { WorkspaceSearch } = require("@blockly/plugin-workspace-search")
const Toastify = require('toastify-js');

function fireNotify(text, status, destination, duration=3000) {
    let color;
    if (status == "success") {
        color = "#a5dc86"
    } else if (status == "warning") {
        color = "#f8bb86"
    } else if (status == "error") {
        color = "#f27474"
    } else if (status == "info") {
        color = "#3fc3ee"
    } 

    Toastify({
        text: text,
        duration: duration,
        destination: destination,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: color,
        }
    }).showToast();
}

let isprojectsaved = false;
let isprojectopened = false;
let usedlibinproject = []

console.log("Initializing blockly workspace...")
Blockly.utils.colour.setHsvSaturation(0.9)

let originaltoolbar = fs.readFileSync(path.join(__dirname, "toolbox.xml"), 'utf8');

try {
    const theme = Blockly.Theme.defineTheme('themeName', {
        base: Blockly.Themes.Classic,
        componentStyles: {
            workspaceBackgroundColour: "#1e1e1e",
            toolboxBackgroundColour: "blackBackground",
            toolboxForegroundColour: "#fff",
            flyoutBackgroundColour: "#252526",
            flyoutForegroundColour: "#ccc",
            flyoutOpacity: 1,
            scrollbarColour: "#797979",
            insertionMarkerColour: "#fff",
            insertionMarkerOpacity: .3,
            scrollbarOpacity: .4,
            cursorColour: "#d0d0d0",
            blackBackground: "#333"
        }
    });

    var workspace = Blockly.inject('blocklyDiv', {
        toolbox: originaltoolbar,
        trashcan: true,
        grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true
        }, 
        zoom:{
            controls: true,
            wheel: true,
            startScale: 1.0,
            maxScale: 5,
            minScale: 0.1,
            scaleSpeed: 1.1,
            pinch: true
        },
        theme: theme
    });

    const workspaceSearch = new WorkspaceSearch(workspace);
    workspaceSearch.init();

    workspace.getToolbox().getFlyout().autoClose = false;
} catch (e) {
    ipc.send("erroronstart", `Error on initializing workspace: ${e}`)
}

console.log("Initializing event...")

ipc.on('export-lua-request', (event) => {    
    console.log("exporting lua")
    ipc.send('export-lua', gencodeonly());
})

// Save workspace
ipc.on('save-workspace-request', (event) => {
    console.log("Saving project...")
    fireNotify(`Saving...`, "warning")
    const state = Blockly.serialization.workspaces.save(workspace);
    const data = {
        "usedlibrary": usedlibinproject,
        "content": state
    }
    
    ipc.send('save-workspace', data);
});

// Load workspace
ipc.on('load-workspace', (event, json) => {
    console.log("Loading project...")
    try {
        if (json) {
            data = JSON.parse(json)
            const libinproject = data.usedlibrary
            workspace.clear()
            for (let i = 0; i < libinproject.length; i++) {
                const packagefolder = libinproject[i]
                if (!usedlibinproject.includes(packagefolder)) {
                    try {
                        originaltoolbar = loadperipheral(workspace, originaltoolbar, packagefolder, usedlibinproject);
                        usedlibinproject.push(packagefolder);
                    } catch (e) {
                        fireNotify(`Can't Import ${usedlibinproject[i]}: ${e}`, "error")
                    }
                    
                }
            }
            Blockly.serialization.workspaces.load(data.content, workspace);
            isprojectsaved = true
            fireNotify(`Project Loaded`, "success")
        } 
    } catch (e) {
        fireNotify(`Can't Load Project: ${e}`, "error")
    }
})

ipc.on('workspace-saved', (event, success) => {
    isprojectsaved = success
    if (!isprojectopened) {
        isprojectopened = true;
    }
    fireNotify(`Project Saved`, "success")
});

ipc.on("open-about", () => {
    document.getElementById('about-popup').style.display = 'block';
})

workspace.addChangeListener(function(event) {
    if ([Blockly.Events.UI, 
        Blockly.Events.VIEWPORT_CHANGE, 
        Blockly.Events.TOOLBOX_ITEM_SELECT]
        .includes(event.type)) {
      return; // Don't care about UI events.
    }
    if (isprojectsaved) {
        isprojectsaved = false
        ipc.send("workspace-notsave")
    } else if (!isprojectopened) {
        ipc.send("workspace-unsave")
    }
});

document.getElementById("packageman-import-btn").addEventListener('click', () => {
    var librarypopup = document.getElementById('library-popup');
    librarypopup.style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    setTimeout(function() {
        librarypopup.style.display = 'none'; // Hide popup after animation completes
        librarypopup.style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds

    const selectedItems = document.querySelectorAll('.library-item.selected');
    selectedItems.forEach(item => {
        const packagefolder = item.getAttribute('data-libraryfolder');
        originaltoolbar = loadperipheral(workspace, originaltoolbar, packagefolder, usedlibinproject);
        fireNotify(`Loaded ${packagefolder}`, "success")
    });
});

async function InitializingBlock() {
    try {
        console.log("Importing system library...");
        const sysmodulejson = fs.readFileSync(path.join(__dirname, "module_block_design.json"), 'utf8');
        const blocksJson = JSON.parse(sysmodulejson);

        for (const blockId in blocksJson) {
            if (blocksJson.hasOwnProperty(blockId)) {
                Blockly.Blocks[blockId] = {
                    init: function() {
                        this.jsonInit(blocksJson[blockId]);
                    }
                };
            }
        }
        require("./module_generator");

        console.log("Check library folder...");
        if (isBlocksFolderEmpty()) {
            await downloadBlocks(); 
        } 
        scanindex();


    } catch (e) {
        ipc.send("erroronstart", `Error on loading block: ${e}`);
    }

    // Ensure Blockly container is shown after the workspace is injected
    console.log("Finished")
    setTimeout(() => {
        ipc.send("ready")
        // Hide loading area
        const loadingArea = document.querySelector('.loading-area');
        loadingArea.style.opacity = '0';
        loadingArea.style.visibility = 'hidden';
        loadingArea.style.display = 'none';
        
        // Show content area
        const contentArea = document.querySelector('.content-area');
        contentArea.style.opacity = '1';
        contentArea.style.visibility = 'visible';
    }, 500);
}

InitializingBlock();