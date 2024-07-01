document.getElementById('statusMessage').textContent = "loading";

const fs = require('fs');
const path = require('path');
const { ipcRenderer } = require("electron");
const { loadperipheral } = require("./blocksmanager");
const { luaGenerator } = require('blockly/lua');  // Use require syntax for Blockly module

const ipc = ipcRenderer;

// override prompt command
window.prompt = function(promptText, defaultValue) {
    return ipc.sendSync("prompt", promptText, defaultValue);
};

const Blockly = require('blockly');

Blockly.utils.colour.setHsvSaturation(0.9)

const peripheralsfolder = path.join(__dirname, "../peripherals");

const originaltoolbar = fs.readFileSync(path.join(__dirname, "toolbox.xml"), 'utf8');
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
    

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: originaltoolbar,
    trashcan: true,
    grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true
    }
});


loadperipheral(workspace, originaltoolbar, "test");

document.getElementById('statusMessage').textContent = "ready";

workspace.getToolbox().getFlyout().autoClose = false;

// Ensure Blockly container is shown after the workspace is injected
document.getElementById('loadingScreen').style.display = 'none';
document.getElementById('blocklyContainer').style.display = 'block';

function gencode() {
    return luaGenerator.workspaceToCode(workspace);
}
