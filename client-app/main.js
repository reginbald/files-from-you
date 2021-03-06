const { app, BrowserWindow } = require('electron');
var path = require('path');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 700,
    height: 700,
    backgroundColor: '#ffffff',
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);

  //// uncomment below to open the DevTools.
  //win.webContents.openDevTools();

  // Event when the window is closed.
  win.on('closed', function() {
    win = null;
  });
}

// Create window on electron intialization
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});
