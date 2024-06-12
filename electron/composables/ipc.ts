import { BrowserWindow, ipcMain } from "electron";
import { slidevTempFiles, createModel, useUserFiles, capturePage } from '@main/composables'
import type { UserFilesActions, UserFileOptions } from '@main/composables'

const fsActionsMap: UserFilesActions[] = ['write', 'read', 'delete', 'clear', 'readAllJsonFiles']

export const ipcHandle = (main: BrowserWindow) => {
  ipcMain.handle('temp:read', async () => {
    const files = await slidevTempFiles();
    return files;
  })
  ipcMain.handle('model:create', async (event, option) => {
    await createModel(main, option);
  })
  fsActionsMap.forEach(action => {
    ipcMain.handle(`user:${action}`, async (event, option: UserFileOptions) => {
      return useUserFiles[action](option);
    })
  })
  ipcMain.handle('app:capture-page', async (event, option) => {
    await capturePage(main, option);
  })
}
