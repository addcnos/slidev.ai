// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import type { ModelOption, UserFilesActions, UserFileOptions, UserFileResponse } from '@main/composables';
interface IpcEmitter {
  setTitle: (title: string) => Promise<void>;
  readFiles: () => Promise<Record<string, unknown>>;
  createModel: (option: ModelOption) => Promise<void>;
  fileManager: (action: UserFilesActions, option: UserFileOptions) => UserFileResponse;
}

interface ContentListener {
  onRresh: (callback: () => void) => void;
}
declare global {
  interface Window {
    ipcEmitter: IpcEmitter;
    contentListener: ContentListener
  }
}

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('ipcEmitter', {
  setTitle: (title: string) => ipcRenderer.invoke('app:set-title', title),
  readFiles: () => ipcRenderer.invoke('temp:read'),
  createModel: (option: ModelOption) => ipcRenderer.invoke('model:create', option),
  fileManager: (action: UserFilesActions, option: UserFileOptions) => ipcRenderer.invoke(`user:${action}`, option),
});

// 渲染器进程 监听主进程事件 on-xxx
contextBridge.exposeInMainWorld('contentListener', {
  onRresh: (callback: () => void) => ipcRenderer.on('app:refresh', callback),
})
