const WebSocket = require('ws');

class CCRemote {
    constructor(ip = "127.0.0.1", port = 5133) {
        this.socket = new WebSocket.Server({
            port: port,
            host: ip
        });

        this.clients = new Map(); // Map to track client data (numeric IDs)
        this.clientIdCounter = 0; // Counter for numeric client IDs

        console.log("Remote server is started");
        fireNotify(
            "Remote server started, waiting for clients to connect...",
            "info"
        );

        this.socket.on('connection', (ws) => {
            const clientId = this.clientIdCounter++;
            this.clients.set(clientId, { ws, isAlive: true, name: `Client-${clientId}`, clientInfo: null });

            if (this.clients.size >= 0) {
                document.getElementById("navbar-button-computer-disconnect").disabled = false;
                document.getElementById("navbar-button-computer-run").disabled = false;
            }

            console.log(`Client ${clientId} connected.`);
            fireNotify(`Client ${clientId} connected`, "success");

            // Send "info" command to the client immediately upon connection
            this.sendCommandToClient(clientId, 'info', true);

            ws.on('pong', () => {
                this.clients.get(clientId).isAlive = true;
            });

            ws.on('message', (message) => {
                console.log(`Message from Client ${clientId}: ${message}`);
                // Handle info response
                try {
                    const data = JSON.parse(message);

                    if (data.OSVersion && typeof data.OSVersion === 'string' &&
                        data.Name && typeof data.Name === 'string' &&
                        typeof data.ID === 'number' &&
                        typeof data.uptime === 'number' &&
                        typeof data.Type === 'number') {
                        
                        // Update clientInfo with the received data
                        this.clients.get(clientId).clientInfo = data;
                        console.log(`Client ${clientId} info updated:`, data);
                    } else {
                        console.log(`Invalid data format from Client ${clientId}:`, data);
                    }
                } catch (error) {
                    console.error(`Error parsing message from Client ${clientId}:`, error);
                }
            });

            ws.on('close', () => {
                console.log(`Client ${clientId} disconnected.`);
                this.clients.delete(clientId);
                fireNotify(`Client ${clientId} disconnected`, "warning");

                if (this.clients.size === 0) {
                    document.getElementById("navbar-button-computer-disconnect").disabled = true;
                    document.getElementById("navbar-button-computer-run").disabled = true;
                }
            });

            ws.on('error', (error) => {
                console.error(`Client ${clientId} error:`, error);
                fireNotify(`Error with Client ${clientId}: ${error.message}`, "error");
            });
        });

        // Ping clients every 30 seconds to check if they are alive
        const interval = setInterval(() => {
            for (const [clientId, clientData] of this.clients.entries()) {
                if (clientData.isAlive === false) {
                    console.log(`Client ${clientId} did not respond to ping, terminating connection.`);
                    fireNotify(`Client ${clientId} did not respond to ping, disconnected`, "warning");
                    clientData.ws.terminate();
                    this.clients.delete(clientId);
                    continue;
                }

                clientData.isAlive = false;
                clientData.ws.ping();
            }
        }, 30000);

        this.socket.on('close', () => {
            clearInterval(interval);
            console.log('WebSocket server closed.');
            fireNotify("WebSocket server closed.", "info");
        });

        this.socket.on('error', (error) => {
            console.error('WebSocket server error:', error);
            fireNotify(`WebSocket server error: ${error.message}`, "error");
        });
    }

    // List all connected clients with their IDs, names, and clientInfo
    // List all connected clients with their IDs, names, and clientInfo
    async listClients() {
        const clientList = [];
        
        // Create an array of promises for fetching client info
        const infoPromises = [];
        
        // Loop over each client and trigger 'info' command to get the latest information
        for (const [clientId, clientData] of this.clients.entries()) {
            if (clientData.ws.readyState === WebSocket.OPEN) {
                const infoPromise = new Promise((resolve) => {
                    // Set a timeout to handle cases where no response is received
                    const timeout = setTimeout(() => {
                        resolve({ id: clientId, name: clientData.name, info: null });
                    }, 5000); // Wait 5 seconds for a response

                    // Listen for the response from the client
                    const messageHandler = (message) => {
                        try {
                            const data = JSON.parse(message);
                            if (data.OSVersion && typeof data.OSVersion === 'string' &&
                                data.Name && typeof data.Name === 'string' &&
                                typeof data.ID === 'number' &&
                                typeof data.uptime === 'number' &&
                                typeof data.Type === 'number') {
                                
                                // Resolve with the valid data
                                resolve({ id: clientId, name: clientData.name, info: data });
                            } else {
                                resolve({ id: clientId, name: clientData.name, info: null });
                            }
                        } catch (error) {
                            resolve({ id: clientId, name: clientData.name, info: null });
                        }
                    };

                    // Send the "info" command to the client
                    this.sendCommandToClient(clientId, 'info', true);
                    
                    // Attach the handler for this specific client
                    clientData.ws.on('message', messageHandler);
                });

                // Add the promise to the array
                infoPromises.push(infoPromise);
            }
        }

        // Wait for all promises to resolve (all client info to be updated)
        const resolvedClientInfo = await Promise.all(infoPromises);

        // Construct the final list of clients with updated information
        for (const clientInfo of resolvedClientInfo) {
            clientList.push(clientInfo);
        }

        return clientList;
    }

    // Check if any client is connected
    isClientConnect() {
        return this.clients.size > 0;
    }

    // Send code to all clients
    sendCode(code) {
        this.clients.forEach((clientData, clientId) => {
            if (clientData.ws.readyState === WebSocket.OPEN) {
                clientData.ws.send("sendcode");
                setTimeout(() => {
                    clientData.ws.send(code);
                }, 500);
            }
        });
    }

    // Send code to a specific client
    sendCodeToClient(clientId, code) {
        const client = this.clients.get(clientId);
        if (!client || client.ws.readyState !== WebSocket.OPEN) {
            console.error(`Client ${clientId} is not available or not connected.`);
            fireNotify(`Client ${clientId} is not connected.`, "error");
            return;
        }

        client.ws.send("sendcode");
        setTimeout(() => {
            client.ws.send(code);
        }, 500);
    }

    // Run code on all clients
    runCode() {
        this.clients.forEach((clientData, clientId) => {
            if (clientData.ws.readyState === WebSocket.OPEN) {
                clientData.ws.send("runcode");
            }
        });
    }

    // Run code on a specific client
    runCodeOnClient(clientId) {
        const client = this.clients.get(clientId);
        if (!client || client.ws.readyState !== WebSocket.OPEN) {
            console.error(`Client ${clientId} is not available or not connected.`);
            fireNotify(`Client ${clientId} is not connected.`, "error");
            return;
        }

        client.ws.send("runcode");
    }

    // Disconnect all clients
    disconnectAllClients() {
        this.clients.forEach((clientData, clientId) => {
            if (clientData.ws.readyState === WebSocket.OPEN) {
                clientData.ws.send("exit");
                clientData.ws.close();
                fireNotify(`Client ${clientId} disconnected`, "warning");
            }
        });
        this.clients.clear();
    }

    // Send a command to a specific client
    sendCommandToClient(clientId, command, expectResponse = false) {
        const client = this.clients.get(clientId);
        if (!client || client.ws.readyState !== WebSocket.OPEN) {
            console.error(`Client ${clientId} is not available or not connected.`);
            fireNotify(`Client ${clientId} is not connected.`, "error");
            return;
        }

        client.ws.send(command);

        if (expectResponse) {
            client.ws.on('message', (response) => {
                console.log(`Response from Client ${clientId}: ${response}`);
            });
        }
    }

    // Send a command to all clients
    sendCommandToAll(command, expectResponse = false) {
        for (const [clientId, clientData] of this.clients.entries()) {
            if (clientData.ws.readyState === WebSocket.OPEN) {
                clientData.ws.send(command);

                if (expectResponse) {
                    clientData.ws.on('message', (response) => {
                        console.log(`Response from Client ${clientId}: ${response}`);
                    });
                }
            }
        }
    }
}

module.exports = { CCRemote };
