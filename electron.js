const { app, BrowserWindow } = require('electron');
const { config } = require('dotenv');
const path = require('path');

const IS_DEV = !!process.env.ELECTRON_DEV;
IS_DEV ? config() : config({ path: path.join(__dirname, '.env.production') });
const CLIENT_URL = process.env.CLIENT_URL;

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    minWidth: 900,
    height: 600,
    minHeight: 600,
    titleBarStyle: 'hidden',
    webPreferences: {
      devTools: IS_DEV,
    },
  });

  win.loadURL(CLIENT_URL ?? '');
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
