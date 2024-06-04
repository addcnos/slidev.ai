import { BrowserWindow, ipcMain } from "electron";
import { slidevTempFiles, createModel, useUserFiles } from '@main/composables'
import type { UserFilesActions, UserFileOptions } from '@main/composables'

export const ipcHandle = (main: BrowserWindow) => {
  ipcMain.handle('temp:read', async () => {
    const files = await slidevTempFiles();
    return files;
  })
  ipcMain.handle('model:create', async (event, option) => {
    await createModel(main, option);
  })
  const actionsMap: UserFilesActions[] = ['write', 'read', 'delete', 'clear']
  actionsMap.forEach(action => {
    ipcMain.handle(`user:${action}`, async (event, option: UserFileOptions) => {
      return useUserFiles[action](option);
    })
  })
}
