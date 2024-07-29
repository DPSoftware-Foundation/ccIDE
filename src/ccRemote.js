const WebSocket = require('ws');

class CCRemote {
    constructor(ip = "127.0.0.1", port = 5133) {
        this.socket = new WebSocket.Server({
            port: port,
            host: ip
        });

        console.log("Remote server is started");

        this.socket.on('connection', (ws) => {
            document.getElementById("navbar-button-computer-disconnect").disabled = false;
            document.getElementById("navbar-button-computer-run").disabled = false;

            document.getElementById('statusMessage').textContent = "Computer connected";
            setTimeout(() => {
                document.getElementById('statusMessage').textContent = `Ready`;
            }, 1000);

            console.log('WebSocket connection established.');

            // Set up heartbeat
            ws.isAlive = true;
            ws.on('pong', () => {
                ws.isAlive = true;
            });

            ws.on('message', (message) => {
                console.log(`Received message => ${message}`);
            });

            ws.on('close', () => {
                document.getElementById("navbar-button-computer-disconnect").disabled = true;
                document.getElementById("navbar-button-computer-run").disabled = true;

                document.getElementById('statusMessage').textContent = "Computer disconnected";
                setTimeout(() => {
                    document.getElementById('statusMessage').textContent = `Ready`;
                }, 1000);
            });

            ws.on('error', (error) => {
                console.error('Client error:', error);
            });
        });

        // Ping clients every 30 seconds to check if they are alive
        const interval = setInterval(() => {
            this.socket.clients.forEach((ws) => {
                if (ws.isAlive === false) {
                    console.log('Client did not respond to ping, terminating connection.');
                    return ws.terminate();
                }

                ws.isAlive = false;
                ws.ping();
            });
        }, 1000);

        this.socket.on('close', () => {
            clearInterval(interval);
            console.log('WebSocket server closed.');
        });

        this.socket.on('error', (error) => {
            console.error('WebSocket server error:', error);
        });
    }

    isClientConnect() {
        for (const client of this.socket.clients) {
            if (client.readyState === WebSocket.OPEN) {
                return true;
            }
        }
        return false;
    }

    sendCommand(command) {
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(command);
            }
        });
    }

    sendCode(Code) {
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("sendcode");
                setTimeout(() => {
                    client.send(Code);
                }, 500);
            }
        });
    }

    runCode() {
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send("runcode");
            }
        });
    }

    disconnectAllClients() {
        this.socket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.close();
            }
        });
    }
}

module.exports = { CCRemote };
