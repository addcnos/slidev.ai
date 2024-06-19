import { BrowserWindow, ipcMain } from "electron";
import { slidevTempFiles, createModel, useUserFiles, capturePage } from '@main/composables'
import type { UserFilesActions, UserFileOptions } from '@main/composables'

const fsActionsMap: UserFilesActions[] = ['write', 'read', 'delete', 'clear', 'readAllJsonFiles', 'getUserFileDir', 'mkdir', 'copy']

export const ipcHandle = (main: BrowserWindow) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ssh: any = null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let activeId: string = '';
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

  ipcMain.handle('connect-ssh', async () => {
    const { NodeSSH } = await import('node-ssh');
    ssh = new NodeSSH()
    ssh.connect({
      host: SSH_HOST,
      username: SSH_USER,
      password: SSH_PASSWORD,
      port: SSH_PORT
    }).then(() => {
      console.log('SSH Connected')
    }).catch((err: unknown) => {
      console.error(err, 'ssh error')
    })
  })

  ipcMain.handle('ssh-update-file', async (event, option: { sourcePath: string, targetPath?: string }) => {
    if (activeId === '') return;
    ssh?.putDirectory(option.sourcePath, option.targetPath || `/home/htdocs/${activeId}`).then(() => { })
  })

  ipcMain.handle('update-id', async (event, id) => {
    activeId = id;
  })

  ipcMain.handle('get-id', async () => {
    return activeId;
  })

}
