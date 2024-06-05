import { app, BrowserWindow, session } from 'electron';
import path from 'path';
import { createExpress, ipcHandle } from '@main/composables'

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const ICON_PATH = path.join(__dirname, '../../icons/icon.png');

let mainWindow: BrowserWindow | null = null;
const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 960,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: app.isPackaged ? '' : ICON_PATH
  });

  // 拦截请求并添加CORS头
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['Cross-Origin-Resource-Policy'] = 'cross-origin';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadURL('http://localhost:3030/index.html');
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createExpress();
  ipcHandle(mainWindow)
  // dev环境 设置 macOS 任务栏图标
  if (process.platform === 'darwin' && !app.isPackaged) {
    app.dock.setIcon(ICON_PATH);
  }
}).then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
