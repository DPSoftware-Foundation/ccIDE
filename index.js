console.log("Initializing...")
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const fs = require('fs');
const prompt = require('electron-prompt');
const path = require('path');
const pino = require('pino')
const pretty = require('pino-pretty');
const { log } = require('console');
const ipc = ipcMain

const logger = pino(pretty())

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

var currentprojectpath = null;
var currentprojectname = null;
var currentprojectopen = false;
var appexiting = false;
var appreloading = false;
var currentworkspacechange = false;
var isopennewproject = false;

var appstarted = false;
var version;

try {
    // Read package.json synchronously
    const data = fs.readFileSync('package.json', 'utf8');

    // Parse JSON
    const packageJson = JSON.parse(data);

    // Get project version
    version = packageJson.version;

    console.log("Project version:", version);
} catch (err) {
    console.error("Error reading package.json:", err);
}

app.whenReady().then(() => {
    logger.info("Initializing splash window...")
    reloadall(false);
    var splash = new BrowserWindow({
        width: 600, 
        height: 300, 
        icon: path.join(__dirname, 'assets', 'ccIDEIcon.ico'),
        transparent: true, 
        frame: false, 
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    splash.loadFile('src/splash.html');

    logger.info("Initializing main windows...")

    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.join(__dirname, 'assets', 'ccIDEIcon.ico'),
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
        show: false,
        center: true,
    })
    
    try {
        win.loadFile('src/index.html');
    } catch {
        try {
            win.loadFile('dist_src/index.html');
        } catch {
            dialog.showErrorBox("Error on startup", "Can't find index.html");
        }
    }
    win.setTitle(`ccIDE v${version}`)

    ipc.once('ready', () => {
        splash.webContents.send("isloaded")
        splash.webContents.send("change-status", "Thanks for using software from DPSoftware.")
        splash.webContents.send("change-title", `ccIDE v${version}`)
        logger.info("Ready!")
        if (splash) {
            splash.hide();
        }
        win.show();
        //win.maximize();
        appstarted = true;
    });

    ipc.on('erroronstart', (event, errormessage) => {
        logger.error(errormessage)
        dialog.showErrorBox("Error on startup", errormessage);
        //win.openDevTools();
    });

    ipc.on('error', (event, errormessage) => {
        logger.error(errormessage)
        dialog.showErrorBox("Error", errormessage);
        //win.openDevTools();
    });

    ipc.on('update-log-status', (event, status) => {
        logger.info(status)
        if (!appstarted) {
            splash.webContents.send("change-status", status)
        } 
    });
    
    //app.on('activate', () => {
    //    if (BrowserWindow.getAllWindows().length === 0) {
    //        createWindow()
    //    }
    //})

    function reloadall(isloaded=true) {
        currentprojectpath = null;
        currentprojectname = null;
        currentprojectopen = false;
        currentworkspacechange = false;
        appexiting = false;
        appreloading = false;
        isopennewproject = false;
        if (isloaded) {
            win.setTitle(`ccIDE v${version}`)
            win.reload();
        }
    }

    logger.info("Settings up menu bar...")
    // Define a custom menu template
    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        if (currentworkspacechange) {
                            const result = dialog.showMessageBoxSync({
                                type: 'question',
                                buttons: ['Save', 'Don\'t Save', 'Cancel'],
                                defaultId: 2,
                                title: 'Save Changes',
                                message: "Your project is not saved",
                            });
                            if (result === 1) {
                                // Don't save
                                reloadall();
                            } else if (result === 0) {
                                // Save 
                                appreloading = true;
                                win.webContents.send('save-workspace-request');
                            }
                        } else {
                            reloadall();
                        }
                    }
                },
                {
                    label: 'Open',
                    accelerator: 'CmdOrCtrl+O',
                    click: () => {
                        if (currentworkspacechange) {
                            const result = dialog.showMessageBoxSync({
                                type: 'question',
                                buttons: ['Save', 'Don\'t Save', 'Cancel'],
                                defaultId: 2,
                                title: 'Save Changes',
                                message: "Your project is not saved",
                            });
                            if (result === 1) {
                                // Don't save
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
    
                                            win.setTitle(`${currentprojectname} | ccIDE v${version}`)
                                        });
    
                                    }
                                }).catch(err => {
                                    console.error('Error showing open dialog:', err);
                                });
                            } else if (result === 0) {
                                // Save 
                                isopennewproject = true;
                                win.webContents.send('save-workspace-request');
                            }
                        } else {
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

                                        win.setTitle(`${currentprojectname} | ccIDE v${version}`)
                                    });

                                }
                            }).catch(err => {
                                console.error('Error showing open dialog:', err);
                            });
                        }
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
                    label: 'Export',
                    submenu: [
                        {
                            label: "Export Lua",
                            accelerator: 'CmdOrCtrl+Shift+L',
                            click: () => {
                                win.webContents.send('export-lua-request');
                            }
                        }
                    ]
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
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        },
        {
            label: 'Help',
            submenu: [
                { label: 'DevTools', accelerator: 'F12', click: () => {win.openDevTools()}},
                { type: 'separator' },
                {
                    label: 'About',
                    click: () => {
                        win.webContents.send("open-about")
                    }
                },
                {
                    label: 'Splash Screen',
                    click: () => {
                        if (!splash.isVisible()) {
                            splash.show();
                        } else {
                            splash.hide();
                        }
                    }
                }
            ]
        }
    ];

    // Set the custom menu
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    logger.info("Settings up event...")
    
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

                            win.setTitle(`${currentprojectname} | ccIDE v${version}`)
                            if (currentworkspacechange) {
                                currentworkspacechange = false;
                            }
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

                    win.setTitle(`${currentprojectname} | ccIDE v${version}`)

                    if (currentworkspacechange) {
                        currentworkspacechange = false;
                    }

                    if (appexiting) {
                        app.quit();
                    }
                    if (appreloading) {
                        reloadall();
                    }
                    if (isopennewproject) {
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

                                    win.setTitle(`${currentprojectname} | ccIDE v${version}`)
                                });

                            }
                        }).catch(err => {
                            console.error('Error showing open dialog:', err);
                        });
                    }
                }
            });
        }
    });

    ipc.on('export-lua', (event, data) => {
        dialog.showSaveDialog(win, {
            title: 'Save Project',
            defaultPath: path.join(app.getPath('documents'), 'main.lua'),
            filters: [
                { extensions: ['lua'] }
            ]
        }).then(result => {
            if (!result.canceled) {
                fs.writeFile(result.filePath, data, (err) => {
                    if (err) {
                        console.error('Error exporting lua from project:', err);
                        dialog.showErrorBox("Export Lua Error", err.message)
                    }
                });
            }
        }).catch(err => {
            console.error('Error exporting lua from project:', err);
            dialog.showErrorBox("Export Lua Error", err.message)
        });
    });

    ipc.on('workspace-notsave', (event) => {
        win.setTitle(`${currentprojectname}* | ccIDE v${version}`)
        currentworkspacechange = true;
    })
    ipc.on('workspace-unsave', (event) => {
        currentworkspacechange = true;
    })

    // Listen for the close event of the main window
    /*
    win.on('close', (event) => {
        event.preventDefault()
        if (currentprojectopen && !currentworkspacechange) {
            const result = dialog.showMessageBoxSync({
                type: 'question',
                buttons: ['Save', 'Don\'t Save', 'Cancel'],
                defaultId: 2,
                title: 'Save Changes',
                message: "Your project is not saved",
            });
            if (result === 1) {
                // Don't save, continue closing
                win.close();
            } else if (result === 0) {
                // Save and then quit
                appexiting = true;
                win.webContents.send('save-workspace-request');
            }
        } else {
            win.destroy();
        }
    });
    */

    win.on("closed", () => {
        logger.info("Exiting...")
        if (splash) {
            splash.close()
        }
    })
    
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    logger.info("Exited")
});