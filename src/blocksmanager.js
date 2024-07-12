const fs = require('fs');
const path = require('path');

const peripheralsfolder = path.join(__dirname, "../blocks");

function mergeXml(originalXml, appendXml) {
    // Remove <xml id="toolbox" style="display: none;"> and </xml> from appendXml
    const cleanedAppendXml = appendXml.replace(/^<xml[^>]*>|<\/xml>$/g, '').trim();

    // Find the closing </xml> tag in originalXml
    const closingTag = '</xml>';
    const index = originalXml.lastIndexOf(closingTag);
    
    if (index === -1) {
        console.error('Closing </xml> tag not found in original XML.');
        return originalXml; // return original XML as is
    }

    // Prepare the modified XML with the insertion of cleanedAppendXml
    const modifiedXml = originalXml.slice(0, index) + cleanedAppendXml + originalXml.slice(index + closingTag.length);

    return modifiedXml;
}

function loadperipheral(workspace, currenttoolbar, peripherals) {
    const filePath = path.join(peripheralsfolder, peripherals);
    const jsonfilePath = path.join(filePath, "block_design.json");
    const xmlfilePath = path.join(filePath, "toolbox.xml");
    const generatorfilePath = path.join(filePath, "generator.js"); // Path to generator.js

    // Load generator.js
    // Load blocks from block_design.json
    fs.readFile(jsonfilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error loading JSON file:', err);
            return;
        }
        try {
            const blocksJson = JSON.parse(data);
            for (const blockId in blocksJson) {
                if (blocksJson.hasOwnProperty(blockId)) {
                    Blockly.Blocks[blockId] = {
                        init: function() {
                            this.jsonInit(blocksJson[blockId]);
                        }
                    };
                }
            }
        } catch (e) {
            document.getElementById('statusMessage').textContent = 'Error parsing JSON file: ' + e;
            return;
        }
    });

    // Load and merge new toolbox XML
    const toolbar = fs.readFileSync(xmlfilePath, 'utf8');
    const newxml = mergeXml(currenttoolbar, toolbar);
    
    workspace.updateToolbox(newxml);

    document.getElementById('statusMessage').textContent = `Loaded ${peripherals}`;

    try {
        require(generatorfilePath); // This will execute generator.js if it's a Node.js module
    } catch (error) {
        console.error('Error loading generator.js:', error);
    }

    return newxml;
}



module.exports = {
    loadperipheral
}