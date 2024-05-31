// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import type { ModelOption } from '@main/composables';
interface IpcRenderer {
  setTitle: (title: string) => Promise<void>;
  readFiles: () => Promise<Record<string, unknown>>;
  createModel: (option: ModelOption) => Promise<void>;
}

declare global {
  interface Window {
    ipcRenderer: IpcRenderer;
  }
}

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('ipcRenderer', {
  setTitle: (title: string) => ipcRenderer.invoke('set-title', title),
  readFiles: () => ipcRenderer.invoke('read-files'),
  createModel: (option: ModelOption) => ipcRenderer.invoke('create-model', option),
});

