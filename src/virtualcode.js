// override prompt command
window.prompt = function(promptText, defaultValue) {
    return ipc.sendSync("prompt", promptText, defaultValue);
};

const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require("electron");
const { loadperipheral, scanindex } = require("./blocksmanager");
const Blockly = require('blockly');
const ipc = ipcRenderer;

let isprojectsaved = false;
let isprojectopened = false;
let usedlibinproject = []

Blockly.utils.colour.setHsvSaturation(0.9)

let originaltoolbar = fs.readFileSync(path.join(__dirname, "toolbox.xml"), 'utf8');
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

try {
    scanindex();

    originaltoolbar = loadperipheral(workspace, originaltoolbar, "IDE");
    usedlibinproject.push("IDE");
} catch (e) {
    ipc.send("erroronstart", `Error on loading block: ${e}`)
}
workspace.getToolbox().getFlyout().autoClose = false;

ipc.on('export-lua-request', (event) => {    
    console.log("exporting lua")
    ipc.send('export-lua', gencodeonly());
})

// Save workspace
ipc.on('save-workspace-request', (event) => {
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
            Blockly.serialization.workspaces.load(data.content, workspace);
            isprojectsaved = true
            document.getElementById('statusMessage').textContent = `Project Loaded`;
        } 
    } catch (e) {
        document.getElementById('statusMessage').textContent = `Can't Load Project: ${e}`;
    }
    setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Ready`;
    }, 1000);
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
        if (!usedlibinproject.includes(packagefolder)) {
            try {
                originaltoolbar = loadperipheral(workspace, originaltoolbar, packagefolder);
                usedlibinproject.push(packagefolder);
            } catch (e) {
                document.getElementById('statusMessage').textContent = `Can't Import ${packagefolder}: ${e}`;
            }
        }
        setTimeout(() => {
            document.getElementById('statusMessage').textContent = `Ready`;
        }, 1000);
    });
    
});

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

ipc.on('request-undo-redo', (event, redo) => {
    console.log(redo)
    workspace.undo(redo)
});

ipc.on("open-about", () => {
    document.getElementById('about-popup').style.display = 'block';
})

// Ensure Blockly container is shown after the workspace is injected
document.getElementById('statusMessage').textContent = `Ready`;
ipc.send("ready")