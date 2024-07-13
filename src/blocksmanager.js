const fs = require('fs');
const path = require('path');
const { DOMParser, XMLSerializer } = require('xmldom');

const peripheralsfolder = path.join(__dirname, "../blocks");

function mergeXml(xml1, xml2) {
    const parser = new DOMParser();
    const serializer = new XMLSerializer();

    const doc1 = parser.parseFromString(xml1, 'text/xml');
    const doc2 = parser.parseFromString(xml2, 'text/xml');

    const root1 = doc1.documentElement;
    const children2 = doc2.documentElement.childNodes;

    // Iterate through children2 and append each node to root1
    for (let i = 0; i < children2.length; i++) {
        root1.appendChild(children2[i].cloneNode(true));
    }

    const mergedXml = serializer.serializeToString(doc1);
    console.log(mergedXml)
    return mergedXml;
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