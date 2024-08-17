const fs = require('fs');
const path = require('path');
const { DOMParser, XMLSerializer } = require('xmldom');

const peripheralsfolder = path.join(__dirname, "../blocks"); 

const fallbackImagePath = path.join(__dirname, '..', 'assets', 'noimagefallback.png'); // Path to fallback image


const defineicon = {
    computer: {
        basic: path.join(__dirname, '..', 'assets', 'basic_computer.png'),
        adv: path.join(__dirname, '..', 'assets', 'adv_computer.png'),
        command: path.join(__dirname, '..', 'assets', 'command_computer.png'),
        pocket: path.join(__dirname, '..', 'assets', 'pocket_computer.png'),
        advpocket: path.join(__dirname, '..', 'assets', 'adv_pocket_computer.png'),
        turtle: path.join(__dirname, '..', 'assets', 'turtle.png'),
        advturtle: path.join(__dirname, '..', 'assets', 'adv_turtle.png')
    },
    peripheral: path.join(__dirname, '..', 'assets', 'peripheral.png'),
    library: path.join(__dirname, '..', 'assets', 'library.png'),
    networkreq: path.join(__dirname, '..', 'assets', 'network-require.png')
}

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
    return mergedXml;
}

function loadperipheral(workspace, currenttoolbar, peripherals) {
    console.log(`Importing ${peripherals} blocks`)

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

    require(generatorfilePath); // This will execute generator.js if it's a Node.js module

    console.log(`Loaded ${peripherals} blocks`)

    return newxml;
}

function extractFolderName(path) {
    // Normalize path separators to handle both Windows and Unix-style paths
    const normalizedPath = path.replace(/[\\\/]/g, '/');
    // Split by '/' to get path segments
    const parts = normalizedPath.split('/');
    // Filter out empty parts and get the last segment
    const folderName = parts.filter(part => part.trim() !== '').pop();
    return folderName;
}

function fileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        return false;
    }
}

function addimageiconinfo(div, src, tiptool) {
    const img = document.createElement('img');
    img.src = src
    img.classList.add("libimageicon");
    img.setAttribute('data-bs-toggle', "tooltip");
    img.setAttribute('data-bs-placement', "bottom");
    img.setAttribute('data-bs-title', tiptool);
    div.appendChild(img);
    console.log(`added image ${src}`);
}

function scanindex() {
    let foundedpackages = 0;
    document.getElementById('statusMessage').textContent = "Scanning Packages...";
    // clear all item in libcontainer
    document.getElementById('libcontainer').innerHTML = "";

    const files = fs.readdirSync(peripheralsfolder);

    // Iterate through files and directories
    files.forEach(file => {
        const filePath = path.join(peripheralsfolder, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // If it's a directory, recursively call scanFolders
            const files = fs.readdirSync(filePath);
            files.forEach(file => {
                if (file === 'index.json') {
                    const filePath2 = path.join(filePath, file);
                    // If it's a file named index.json, read its contents
                    const content = fs.readFileSync(filePath2, 'utf8');
                    const jsonData = JSON.parse(content);

                    blockfoldername = extractFolderName(filePath);
                    if (!blockfoldername.startsWith("_")) {
                        foundedpackages++;

                        // create item in list
                        const imagePath = path.join(filePath, "icon.png");

                        const libraryItem = document.createElement('div');
                        libraryItem.classList.add('library-item', 'overflow-auto', 'library-container');
                        libraryItem.setAttribute('data-libraryfolder', blockfoldername);

                        // add image
                        const img = document.createElement('img');
                        img.classList.add('libimage');
                        if (fileExists(imagePath)) {
                            img.src = imagePath;
                        } else {
                            img.src = fallbackImagePath;
                        }
                        libraryItem.appendChild(img);

                        // Create the library details container
                        const libraryDetails = document.createElement('div');
                        libraryDetails.classList.add('library-details');
                        
                        // Create the title element
                        const title = document.createElement('h3');
                        title.textContent = jsonData.name + ` [v${jsonData.version} by ${jsonData.author}]`;
                        libraryDetails.appendChild(title);

                        // Create the description element
                        const description = document.createElement('p');
                        description.innerHTML = jsonData.description;
                        libraryDetails.appendChild(description);

                        if (jsonData.design_for_computer.basic) {
                            addimageiconinfo(libraryDetails, defineicon.computer.basic, "Basic Computer Supported");
                        }
                        if (jsonData.design_for_computer.adv) {
                            addimageiconinfo(libraryDetails, defineicon.computer.adv, "Advanced Computer Supported");
                        }
                        if (jsonData.design_for_computer.command) {
                            addimageiconinfo(libraryDetails, defineicon.computer.command, "Command Computer Supported");
                        }
                        if (jsonData.design_for_computer.pocket) {
                            addimageiconinfo(libraryDetails, defineicon.computer.pocket, "Pocket Computer Supported");
                        }
                        if (jsonData.design_for_computer.advpocket) {
                            addimageiconinfo(libraryDetails, defineicon.computer.advpocket, "Advanced Pocket Computer Supported");
                        }
                        if (jsonData.design_for_computer.turtle) {
                            addimageiconinfo(libraryDetails, defineicon.computer.turtle, "Turtle Supported");
                        }
                        if (jsonData.design_for_computer.advturtle) {
                            addimageiconinfo(libraryDetails, defineicon.computer.advturtle, "Advanced Turtle Supported");
                        }

                        // check computer type support
                        if (jsonData.peripherals) {
                            addimageiconinfo(libraryDetails, defineicon.peripheral, "Peripheral");
                        }
                        if (jsonData.library) {
                            addimageiconinfo(libraryDetails, defineicon.library, "Library");
                        }
                        if (jsonData.require_network) {
                            addimageiconinfo(libraryDetails, defineicon.networkreq, "Require Network");
                        }

                        libraryItem.appendChild(libraryDetails);
                        document.getElementById('libcontainer').appendChild(libraryItem);
                        console.log(`Registered ${blockfoldername} blocks and added to packages managers`)
                    }
                }

            })
        }
    });

    document.querySelectorAll('.library-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
        });
    });

    document.getElementById('statusMessage').textContent = `Founded ${foundedpackages} Packages`;
    setTimeout(() => {
        document.getElementById('statusMessage').textContent = `Ready`;
    }, 1000);
}


module.exports = {
    loadperipheral,
    scanindex
}