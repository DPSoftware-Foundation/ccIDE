const fs = require('fs');
const path = require('path');
const https = require('https');
const unzipper = require('unzipper');
const { DOMParser, XMLSerializer } = require('xmldom');

const peripheralsfolder = path.join(__dirname, "../blocks"); 

const fallbackImagePath = path.join(__dirname, '..', 'assets', 'noimagefallback.png'); // Path to fallback image

let progressBar = document.getElementById('progressBarloading');
let blocks_url = "https://cdn.damp11113.xyz/file/zip/ccide/blockslastest.zip?dl=1"

function isBlocksFolderEmpty() {
    try {
        const files = fs.readdirSync(peripheralsfolder);
        return files.length === 0; // Returns true if the folder is empty
    } catch (err) {
        console.error('Error reading folder:', err);
        return false; // Return false or handle error as needed
    }
}

async function downloadBlocks() {
    try {
        progressBar.style.display = 'inline-block';
        // Create the output directory if it doesn't exist
        if (!fs.existsSync(peripheralsfolder)) {
            fs.mkdirSync(peripheralsfolder, { recursive: true });
        }

        console.log('Downloading blocks...');

        const zipFilePath = path.join(peripheralsfolder, 'blocks.zip');

        // Download the file as a Promise
        await new Promise((resolve, reject) => {
            https.get(blocks_url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Download failed with status code ${response.statusCode}`));
                    return;
                }

                const totalBytes = parseInt(response.headers['content-length'], 10);
                let downloadedBytes = 0;

                const file = fs.createWriteStream(zipFilePath);

                response.on('data', (chunk) => {
                    downloadedBytes += chunk.length;
                    const percentCompleted = Math.round((downloadedBytes / totalBytes) * 100);
                    progressBar.value = percentCompleted;
                    progressBar.innerText = percentCompleted + '%'; // Fallback text
                    process.stdout.write(`Download progress: ${percentCompleted}%\r`);
                });

                response.pipe(file);

                file.on('finish', () => {
                    file.close();
                    console.log('\nFile downloaded successfully.');
                    resolve();
                });

                file.on('error', (error) => {
                    fs.unlinkSync(zipFilePath);
                    reject(error);
                });
            }).on('error', (error) => {
                reject(error);
            });
        });

        console.log('Unzipping file...');
        
        // Unzip the file as a Promise
        await new Promise((resolve, reject) => {
            fs.createReadStream(zipFilePath)
                .pipe(unzipper.Extract({ path: peripheralsfolder }))
                .on('close', () => {
                    console.log('File unzipped successfully.');
                    fs.unlinkSync(zipFilePath); // Delete the zip file after extraction
                    console.log('Zip file deleted.');

                    console.log('Downloaded blocks');
                    progressBar.style.display = 'none';
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });



    } catch (error) {
        console.error('Error downloading or unzipping file:', error);
    }
}


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

function loadperipheral(workspace, currenttoolbar, peripherals, usedlibinproject) {
    if (!usedlibinproject.includes(peripherals)) {
        try {
            console.log(`Importing ${peripherals} blocks`);

            const filePath = path.join(peripheralsfolder, peripherals);
            const jsonfilePath = path.join(filePath, "block_design.json");
            const xmlfilePath = path.join(filePath, "toolbox.xml");
            const generatorfilePath = path.join(filePath, "generator.js");
            const indexfilePath = path.join(filePath, "index.json");

            // Synchronously read and parse the index.json file
            const indexcontent = JSON.parse(fs.readFileSync(indexfilePath, 'utf8'));
            const dependencies = indexcontent.dependencies;
            dependencies.forEach((dependency) => {
                currenttoolbar = loadperipheral(workspace, currenttoolbar, dependency, usedlibinproject);
            });

            // Synchronously load and parse block_design.json
            const blocksJson = JSON.parse(fs.readFileSync(jsonfilePath, 'utf8'));
            for (const blockId in blocksJson) {
                if (blocksJson.hasOwnProperty(blockId)) {
                    Blockly.Blocks[blockId] = {
                        init: function() {
                            this.jsonInit(blocksJson[blockId]);
                        }
                    };
                }
            }

            // Synchronously load and merge new toolbox XML
            const toolbar = fs.readFileSync(xmlfilePath, 'utf8');
            const newxml = mergeXml(currenttoolbar, toolbar);
            workspace.updateToolbox(newxml);

            fireNotify(`Loaded ${peripherals}`, "success")

            // Synchronously require generator.js
            require(generatorfilePath); // This will execute generator.js if it's a Node.js module

            console.log(`Loaded ${peripherals} blocks`);
            usedlibinproject.push(peripherals);

            return newxml;
        } catch (e) {
            fireNotify(`Can't Import ${peripherals}: ${e}`, "error")
            ipc.send("error", `Can't Import ${peripherals}: ${e}`);
        }
    } else {
        return currenttoolbar;
    }
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

    fireNotify(`Founded ${foundedpackages} Packages`, "success")
}

module.exports = {
    loadperipheral,
    scanindex,
    isBlocksFolderEmpty,
    downloadBlocks
}