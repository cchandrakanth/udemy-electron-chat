const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require("path")
const isDev = !app.isPackaged //isPackaged === false which mean we are in development.


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        //The below is for security.
        webPreferences: {
            nodeIntegration: false,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true, //above electron > 14, the contextIsolation: true.
            preload: path.join(__dirname, 'preload.js'),
        }
    })

    win.loadFile('index.html')
    isDev && win.webContents.openDevTools() //Open dev tool if we are in dev environment. (How to disable for QA?)
}

//Reload the application automatically rather than go to the electron app view --> reload after we modify the changes (How to disable for QA?)
if(isDev){
    require("electron-reload")(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

app.whenReady().then( () => {
    createWindow()
})

ipcMain.on('notify', (_, {title, body}) => {
    new Notification({ title, body}).show()
})

//On mac the window is closed but not removed from the dock. To perform that we need to add the following code.
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

//The below code for mac solve this issue: After the window is closed it was not showing the window on click. 
app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})