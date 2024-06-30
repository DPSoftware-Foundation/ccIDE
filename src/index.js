const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const prompt = require('electron-prompt');
const ipc = ipcMain

app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 1300,
        height: 740,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
    //win.openDevTools();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
    
    ipc.on('prompt', (event, promptText, defaultValue) => {
        try {
            prompt({
                title: "ccIDE",
                label: promptText,
                value: defaultValue,
                inputAttrs: {
                    type: 'text', 
                    required: true
                },
                type: 'input',
                alwaysOnTop: true
            })
            .then((r) => {
                if(r === null) {
                    event.returnValue = null
                } else {
                    event.returnValue = r
                }
            })
            .catch(console.error);
        } catch (error) {
            console.error('Error showing prompt dialog:', error);
            event.returnValue = null; // or handle error appropriately
        }
    });
})