const WebSocket = require('ws');

class CCRemote {
    constructor(ip = "127.0.0.1", port = 5133) {
        this.socket = new WebSocket.Server({
            port: port,
            host: ip
        });

        console.log("Server is started");

        this.socket.on('connection', (ws) => {
            console.log('WebSocket connection established.');

            ws.on('message', (message) => {
                console.log(`Received message => ${message}`);
            });
        });

        this.socket.on('close', () => {
            console.log('WebSocket connection closed.');
        });

        this.socket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    sendCommand(command) {
        // Iterate over each connected client and send the command
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(command);
            }
        });
    }

    sendCode(Code) {
        // Iterate over each connected client and send the command
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("sendcode");
                setTimeout(() => {
                    console.log(Code)
                    client.send(Code);
                    return true
                }, 500);
            } else {
                return false
            }
        });
    }
    runCode() {
        // Iterate over each connected client and send the command
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("runcode");
                return true;
            } else {
                return false;
            }
        });
    }

}

module.exports = { CCRemote };
