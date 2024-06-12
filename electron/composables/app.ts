import { BrowserWindow } from 'electron';
import type { Rectangle } from 'electron'
import { writeTempFile } from '@main/composables'
import type { AppPath } from '@main/composables'
export interface ModelOption {
  url: string;
}
export type UserRectangle = Rectangle & {
  fileName: string
  dirName?: string
  appDir?: AppPath
}

// 创建窗口
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

// 截图- 应用内
export const capturePage = async (main: BrowserWindow, option: UserRectangle) => {
  const nativeImage = await main.webContents.capturePage(option);
  const { fileName, dirName = 'screenshot' } = option
  await writeTempFile({
    fileName,
    content: nativeImage.toPNG(),
    dirName
  });
}