const electron = require('electron')
// const createDMG = require('electron-installer-dmg');
const {
    app,
    BrowserWindow
} = require('electron')

const url = require("url");
const path = require("path");
let appWindow
function initWindow() {
    const display = electron.screen.getPrimaryDisplay()
    const maxiSize = display.workAreaSize
    appWindow = new BrowserWindow({
        // width: 1000,
        // height: 800,
        icon: path.join(__dirname,'dist/assets/Icons/icon.icns'),
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true, //**** add this**
        },
        resizable: false,
        height: maxiSize.height,
        width: maxiSize.width
    })
    
    // Electron Build Path
    appWindow.loadURL(
        url.format({
            // pathname: path.join(__dirname, `/dist/index.html`),
            pathname: path.join(__dirname, '/dist/index.html'),
            protocol: "file:",
            slashes: true,
            
        })
    );
    // console.log(__dirname);
    // // Initialize the DevTools.
    // appWindow.webContents.openDevTools()
    // appWindow.on('closed', function () {
    //     appWindow = null
    // })
}
app.on('ready', initWindow)
// Close when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS specific close process
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (appWindow === null) {
        initWindow()
    }
})




