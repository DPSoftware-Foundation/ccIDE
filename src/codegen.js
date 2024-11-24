const { luaGenerator } = require('blockly/lua');  // Use require syntax for Blockly module
const { CCRemote } = require("./ccRemote")

console.log("Starting remote server...")
const ccInstance = new CCRemote('127.0.0.1', 5133);

const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
let upcurrentActive = 1;
let uploadError = false; // Flag to track if there's an error

const defineicon = {
    5: path.join(__dirname, '..', 'assets', 'basic_computer.png'),
    6: path.join(__dirname, '..', 'assets', 'adv_computer.png'),
    7: path.join(__dirname, '..', 'assets', 'command_computer.png'),
    2: path.join(__dirname, '..', 'assets', 'pocket_computer.png'),
    4: path.join(__dirname, '..', 'assets', 'adv_pocket_computer.png'),
    1: path.join(__dirname, '..', 'assets', 'turtle.png'),
    3: path.join(__dirname, '..', 'assets', 'adv_turtle.png')
}

const uploadUpdateProgress = () => {
    circles.forEach((circle, index) => {
        if (index < upcurrentActive) {
            circle.classList.add("active");
            if (index === upcurrentActive - 1 && uploadError) {
                circle.classList.add("error");
            } else {
                circle.classList.remove("error");
            }
        } else {
            circle.classList.remove("active");
            circle.classList.remove("error"); // Ensure no error class on inactive circles
        }
    });

    if (uploadError) {
        progress.classList.add("error");
    } else {
        const actives = document.querySelectorAll(".active");
        progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
        progress.classList.remove("error");
    }
};

function clientexit() {
    ccInstance.disconnectAllClients();
}

function gencodeonly() {
    return luaGenerator.workspaceToCode(workspace);
}

let selectedClientId = null;

async function gencode() {
    console.log("Starting generate code")
    document.getElementById('upload-popup').style.display = 'block';
    upcurrentActive = 1;
    uploadError = false;
    uploadUpdateProgress();
    
    // Compile/convert code
    console.log("Generating code...");
    upcurrentActive++;
    uploadUpdateProgress();
    document.getElementById('upload-status').textContent = "Generating code";
    let code = null;
    try {
        code = luaGenerator.workspaceToCode(workspace);
    } catch (e) {
        uploadError = true;
        uploadUpdateProgress();
        document.getElementById('upload-status').textContent = e;
        return;
    }

    upcurrentActive++;
    uploadUpdateProgress();
    
    if (ccInstance.isClientConnect()) {
        const clients = await ccInstance.listClients();
        document.getElementById('upload-status').innerHTML = "";

        const ClientLists = document.createElement('div');
        ClientLists.classList.add("library-content");

        clients.forEach(client => {
            console.log(`Info:`, client.info);
            
            const ClientItem = document.createElement('div');
            ClientItem.classList.add('library-item', 'overflow-auto', 'library-container');
            ClientItem.setAttribute('data-clientid', client.id);
        
            const img = document.createElement('img');
            img.classList.add('libimage');
            img.src = defineicon[client.info.Type];
            ClientItem.appendChild(img);
        
            const ClientDetails = document.createElement('div');
            ClientDetails.classList.add('library-details');
        
            const title = document.createElement('h3');
            title.textContent = client.info.Name;
            ClientDetails.appendChild(title);
        
            const description = document.createElement('p');
            description.innerHTML = `OS: ${client.info.OSVersion} | ID: ${client.info.ID} | Uptime: ${client.info.uptime}s`;
            ClientDetails.appendChild(description);
        
            ClientItem.appendChild(ClientDetails);
        
            // Add event listener for user selection
            ClientItem.addEventListener('click', () => {
                selectedClientId = client.id; // Correctly store the client ID
                ClientItem.classList.add('selected'); // Optional: Style selected item
            });
        
            ClientLists.appendChild(ClientItem);
        });
        
        const title = document.createElement("h3");
        title.textContent = "Upload to machine";
        document.getElementById('upload-status').appendChild(title);

        document.getElementById('upload-status').appendChild(ClientLists);

        // Wait for user selection
        const waitForSelection = () => new Promise((resolve, reject) => {
            const checkSelection = setInterval(() => {
                if (selectedClientId !== null) {
                    clearInterval(checkSelection);
                    resolve(selectedClientId);
                }
            }, 100); // Check every 100ms if a client is selected
        });

        // Wait until the user selects a client
        try {
            const selectedClientId = await waitForSelection();
            console.log(`Selected client: ${selectedClientId}`);
            
            document.getElementById('upload-status').innerHTML = "";

            // Now proceed with uploading code to the selected client
            console.log("Uploading code to machine...");
            document.getElementById('upload-status').textContent = "Uploading code to machine";
            ccInstance.sendCodeToClient(selectedClientId, code);
            await delay(500);

            // Execute with remote
            console.log("Executing code in machine...");
            document.getElementById('upload-status').textContent = "Executing code";
            upcurrentActive++;
            uploadUpdateProgress();
            ccInstance.runCodeOnClient(selectedClientId);
        } catch (error) {
            console.error("Error waiting for selection:", error);
            uploadError = true;
            uploadUpdateProgress();
            document.getElementById('upload-status').innerHTML = `Error selecting client.`;
        }
    } else {
        console.log("Machine is not connected");
        uploadError = true;
        uploadUpdateProgress();
        document.getElementById('upload-status').innerHTML = `Please Connect Computer to IDE.\nInstruction: <a href="https://github.com/DPSoftware-Foundation/ccIDE#install-remote-code-into-computercraft">Install Remote code into computercraft</a> in github.`;
        return;
    }

    // Done!
    console.log("Run code done!");
    document.getElementById('upload-status').textContent = "Done!";
    await delay(1000);
    document.getElementById('upload-popup').style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    selectedClientId = null;
    setTimeout(function() {
        document.getElementById('upload-popup').style.display = 'none'; // Hide popup after animation completes
        document.getElementById('upload-popup').style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds
}