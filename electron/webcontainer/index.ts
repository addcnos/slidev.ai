import type { WebContainer as WebContainerInstance } from '@webcontainer/api';
import { slidevFiles } from './files';
import { ref } from 'vue'

// let webcontainerInstance: WebContainerInstance;
const webcontainerInstance = ref<WebContainerInstance>(null);
const iframeSrc = ref('');

const writeFile = async (filename: string, content: string) => {
  await webcontainerInstance.value.fs.writeFile(filename, content);
}

const getInitalContent = async () => {
  const content =  await webcontainerInstance.value.fs.readFile('slides.md', 'utf-8');
  return content;
}

const installDependencies = async () => {
  // Install dependencies
  const installProcess = await webcontainerInstance.value.spawn('npm', ['install']);
  // Wait for install command to exit
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  return installProcess.exit;
}
const startDevServer = async () => {
  // Run `npm run start` to start the Express app
  await webcontainerInstance.value.spawn('npm', ['run', 'start']);
  // Wait for `server-ready` event
  webcontainerInstance.value.on('server-ready', (port, url) => {
    iframeSrc.value = url;
  });
}


const mount = () => {
  window.addEventListener('load', async () => {
    // Call only once
    webcontainerInstance.value = await import('@webcontainer/api').then(({ WebContainer }) => WebContainer.boot());
    await webcontainerInstance.value.mount(slidevFiles);
    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error('Installation failed');
    }
    startDevServer();
  });
}

export {
  mount,
  iframeSrc,
  webcontainerInstance,
  writeFile,
  getInitalContent
}