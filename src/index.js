const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const fs = require('fs');
const prompt = require('electron-prompt');
const path = require('path');
const ipc = ipcMain

let currentprojectpath = null;
let currentprojectname = null;
let currentprojectopen = false
let appexiting = false

app.whenReady().then(() => {
    currentprojectpath = null;
    currentprojectname = null;
    currentprojectopen = false;
    appexiting = false;

    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
    //win.openDevTools();
    win.maximize()

    //app.on('activate', () => {
    //    if (BrowserWindow.getAllWindows().length === 0) {
    //        createWindow()
    //    }
    //})

    // Define a custom menu template
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        win.reload()
                    }
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        dialog.showOpenDialog(win, {
                            title: 'Open Project',
                            defaultPath: app.getPath('documents'),
                            filters: [
                                { name: 'ComputerCraft Project', extensions: ['ccp'] }
                            ],
                            properties: ['openFile']
                        }).then(result => {
                            if (!result.canceled) {
                                const filePath = result.filePaths[0];
                                
                                fs.readFile(filePath, 'utf8', (err, json) => {
                                    if (err) {
                                        console.error('Error loading workspace:', err);
                                        return;
                                    }
                                    win.webContents.send('load-workspace', json);

                                    currentprojectpath = result.filePaths[0]
                                    currentprojectname = path.basename(result.filePaths[0]);
                                    currentprojectopen = true;

                                    win.setTitle(`${currentprojectname} | ccIDE`)
                                });

                            }
                        }).catch(err => {
                            console.error('Error showing open dialog:', err);
                        });

                    }
                },
                {
                    label: 'Save',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        win.webContents.send('save-workspace-request');
                    }
                },
                {
                    label: 'Save as',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: () => {
                        currentprojectopen = false
                        win.webContents.send('save-workspace-request');
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                { role: 'undo', accelerator: 'CmdOrCtrl+Z', click: () => {win.webContents.send('request-undo-redo', false)} },
                { role: 'redo', accelerator: 'CmdOrCtrl+Y', click: () => {win.webContents.send('request-undo-redo', true)} },
                { type: 'separator' },
                { role: 'cut', accelerator: 'CmdOrCtrl+X' },
                { role: 'copy', accelerator: 'CmdOrCtrl+C' },
                { role: 'paste', accelerator: 'CmdOrCtrl+V' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { label: 'DevTools', accelerator: 'F12', click: () => {win.openDevTools()}},
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About',
                    click: () => {
                        console.log('About clicked');
                    }
                }
            ]
        }
    ];

    // Set the custom menu
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    
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

    ipc.on('save-workspace', (event, json) => {
        if (!currentprojectopen) {
            dialog.showSaveDialog(win, {
                title: 'Save Project',
                defaultPath: path.join(app.getPath('documents'), 'untitled.ccp'),
                filters: [
                    { name: 'ComputerCraft Project', extensions: ['ccp'] }
                ]
            }).then(result => {
                if (!result.canceled) {
                    fs.writeFile(result.filePath, JSON.stringify(json), (err) => {
                        if (err) {
                            console.error('Error saving project:', err);
                            dialog.showErrorBox("Save Project Error", err.message)
                            win.webContents.send('workspace-saved', false);
                        } else {
                            currentprojectpath = result.filePath
                            currentprojectname = path.basename(result.filePath);
                            currentprojectopen = true;

                            win.webContents.send('workspace-saved', true);

                            win.setTitle(`${currentprojectname} | ccIDE`)
                        }
                    });
                } else {
                    win.webContents.send('workspace-saved', false);
                }
            }).catch(err => {
                console.error('Error showing save dialog:', err);
                dialog.showErrorBox("Save Project Error", err.message)
                win.webContents.send('workspace-saved', false);
            });
        } else {
            fs.writeFile(currentprojectpath, JSON.stringify(json), (err) => {
                if (err) {
                    console.error('Error saving project:', err);
                    dialog.showErrorBox("Save Project Error", err.message)
                    win.webContents.send('workspace-saved', false);
                } else {
                    currentprojectopen = true;

                    win.webContents.send('workspace-saved', true);

                    win.setTitle(`${currentprojectname} | ccIDE`)

                    if (appexiting) {
                        app.quit();
                    }
                }
            });
        }
    });

    ipc.on('workspace-notsave', (event) => {
        win.setTitle(`${currentprojectname}* | ccIDE`)
    })    
})



app.on("close", function(e) {
    console.log("Close event triggered");
    if (currentprojectopen) {
        const result = dialog.showMessageBoxSync({
            type: 'question',
            buttons: ['Save', 'Don\'t Save', 'Cancel'],
            defaultId: 2,
            title: 'Save Changes',
            message: "Your project is not saved",
        });
        if (result === 1) {
            // Don't save, continue closing
            win = null;
        } else if (result === 0) {
            // Save and then quit
            appexiting = true;
            win.webContents.send('save-workspace-request');
        } else {
            // Cancel the close operation
            e.preventDefault();
        }
    } else {
        // No unsaved changes, continue closing
        win = null;
    }
});