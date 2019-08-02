const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const electron = require('electron');
const fs = require('fs');
const LOG_PATH = electron.app.getPath('userData');

let fd = fs.openSync(LOG_PATH + '/grr', 'w');

function write(data) {
    data = data + '\r\n';
    let buff = new Buffer(data, 'binary');
    fs.writeSync(fd, buff, 0, buff.length, null);
}


process.on('uncaughtException', (err) => {
    write('got uncaught exception');
    write(err.stack);
});

write('came in ');
let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    // Set the initial width to 500px
    width: 500,
    // Set the initial height to 400px
    height: 400,
    // set the title bar style
    titleBarStyle: 'hiddenInset',
    // set the background color to black
    backgroundColor: "#111",
    // Don't show the window until it's ready, this prevents any white flickering
    show: false,
    webPreferences: { nodeIntegration: true }
  })	

  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  window.webContents.openDevTools();

  window.once('ready-to-show', () => {
    window.show()
  })
})
