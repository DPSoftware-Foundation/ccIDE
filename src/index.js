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
};

console.log("Importing module...")
const fs = require('fs');
const path = require('path');
const { loadperipheral, scanindex } = require("./blocksmanager");
const Blockly = require('blockly');
const { WorkspaceSearch } = require("@blockly/plugin-workspace-search")

let isprojectsaved = false;
let isprojectopened = false;
let usedlibinproject = []

console.log("Initializing blockly workspace...")
Blockly.utils.colour.setHsvSaturation(0.9)

let originaltoolbar = fs.readFileSync(path.join(__dirname, "toolbox.xml"), 'utf8');

try {
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
        }
    });

    const workspaceSearch = new WorkspaceSearch(workspace);
    workspaceSearch.init();

    workspace.getToolbox().getFlyout().autoClose = false;
} catch (e) {
    ipc.send("erroronstart", `Error on initializing workspace: ${e}`)
}

try {
    console.log("Importing system library...")
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
    require("./module_generator")

    console.log("Scanning library...")
    scanindex();
} catch (e) {
    ipc.send("erroronstart", `Error on loading block: ${e}`)
}

console.log("Initializing event...")

ipc.on('export-lua-request', (event) => {    
    console.log("exporting lua")
    ipc.send('export-lua', gencodeonly());
})

// Save workspace
ipc.on('save-workspace-request', (event) => {
    console.log("Saving project...")
    document.getElementById('statusMessage').textContent = `Saving...`;
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
                        originaltoolbar = loadperipheral(workspace, originaltoolbar, packagefolder);
                        usedlibinproject.push(packagefolder);
                    } catch (e) {
                        document.getElementById('statusMessage').textContent = `Can't Import ${usedlibinproject[i]}: ${e}`;
                        setTimeout(() => {
                            document.getElementById('statusMessage').textContent = `Ready`;
                        }, 1000);
                    }
                }
            }
            setTimeout(() => {
                Blockly.serialization.workspaces.load(data.content, workspace);
                isprojectsaved = true
                document.getElementById('statusMessage').textContent = `Project Loaded`;
            }, 100);
        } 
    } catch (e) {
        document.getElementById('statusMessage').textContent = `Can't Load Project: ${e}`;
    }
    setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Ready`;
    }, 1000);
})

ipc.on('workspace-saved', (event, success) => {
    isprojectsaved = success
    if (!isprojectopened) {
        isprojectopened = true;
    }
    document.getElementById('statusMessage').textContent = `Project Saved`;
    setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Ready`;
    }, 1000);
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
    });
    setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Ready`;
    }, 1000);
});

// Ensure Blockly container is shown after the workspace is injected
console.log("Finished")
setTimeout(() => {
    ipc.send("ready")
}, 500);

document.getElementById('statusMessage').textContent = "Computer isn't connect";
setTimeout(() => {
    document.getElementById('statusMessage').textContent = `Ready`;
}, 10000);