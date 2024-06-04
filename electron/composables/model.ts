import { BrowserWindow } from 'electron';

export interface ModelOption {
  url: string;
}

export const createModel = async (main: BrowserWindow, option: ModelOption) => {
  const view = new BrowserWindow({
    parent: main,
    modal: true,
    show: false,
    webPreferences: {
      devTools: false,
      webSecurity: false,
    }
  });
  view.webContents.loadURL(option.url)
  view.once('ready-to-show', () => {
    view.show();
  })
}
