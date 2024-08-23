const { luaGenerator } = require('blockly/lua');  // Use require syntax for Blockly module
const { CCRemote } = require("./ccRemote")

console.log("Starting remote server...")
const ccInstance = new CCRemote('127.0.0.1', 5133);

const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
let upcurrentActive = 1;
let uploadError = false; // Flag to track if there's an error

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
    ccInstance.sendCommand("exit")
    ccInstance.disconnectAllClients();
}

function gencodeonly() {
    return luaGenerator.workspaceToCode(workspace);
}

async function gencode() {
    console.log("Starting generate code")
    document.getElementById('upload-popup').style.display = 'block';
    upcurrentActive = 1;
    uploadError = false;
    uploadUpdateProgress();
    // compile/convert code

    console.log("Generating code...")
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
        return
    }

    upcurrentActive++;
    uploadUpdateProgress();
    if (ccInstance.isClientConnect()) {
        // upload to computercraft with remote
        console.log("Uploading code to machine...")
        document.getElementById('upload-status').textContent = "Uploading code to machine";
        ccInstance.sendCode(code);
        await delay(500)

        // execute with remote
        console.log("Executing code in machine...")
        document.getElementById('upload-status').textContent = "Executing code";
        upcurrentActive++;
        uploadUpdateProgress();
        ccInstance.runCode();
    } else {
        console.log("Machine is not connected")
        uploadError = true;
        uploadUpdateProgress();
        document.getElementById('upload-status').innerHTML = `Please Connect Computer to IDE.\nInstruction: <a href="https://github.com/DPSoftware-Foundation/ccIDE#install-remote-code-into-computercraft">Install Remote code into computercraft</a> in github. (Please press SHIFT or CTRL and click)`;
        return
    }

    // done!
    console.log("Run code done!")
    document.getElementById('upload-status').textContent = "Done!";
    await delay(1000)
    document.getElementById('upload-popup').style.animation = 'fadeOut 0.3s ease'; // Apply fade-out animation
    setTimeout(function() {
        document.getElementById('upload-popup').style.display = 'none'; // Hide popup after animation completes
        document.getElementById('upload-popup').style.animation = ''; // Reset animation property
    }, 300); // Adjust to match animation duration in milliseconds
}