import { ref } from 'vue'
import { WebContainer } from '@webcontainer/api'
import type { WebContainer as WebContainerInstance, FileSystemTree, FileSystemAPI } from '@webcontainer/api';

// let webcontainerInstance: WebContainerInstance;
const webcontainerInstance = ref<WebContainerInstance>(null);
const iframeSrc = ref('');
const serverProcess = ref(0)
const serverProcessMap = {
  0: '环境配置中，这可能需要一些时间...',
  1: '服务启动中，请稍候...',
  2: '正在加载嵌入内容，马上就好...'
}
const buildLoading = ref(false);
const exportPdfLoading = ref(false);
// The web container fs API
const webcontainerFs = (): FileSystemAPI => {
  return webcontainerInstance.value.fs;
}

// Get the initial content of the slidev's entry file
const getInitalContent = async () => {
  const content = await webcontainerInstance.value.fs.readFile('slides.md', 'utf-8');
  return content;
}

// Install dependencies
const installDependencies = async () => {
  const installProcess = await webcontainerInstance.value.spawn('npm', ['install']);
  // Wait for install command to exit
  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  return installProcess.exit;
}

// Start the dev server
const startDevServer = async () => {
  serverProcess.value = 1;
  // Run `npm run start` to start the Express app
  await webcontainerInstance.value.spawn('npm', ['run', 'dev']);
  // Wait for `server-ready` event
  webcontainerInstance.value.on('server-ready', (port, url) => {
    iframeSrc.value = url;
    serverProcess.value = 2;
  });
}

// Mount the file system tree to the web container
const mount = async (file: FileSystemTree) => {
  // Call only once
  if (!webcontainerInstance.value) {
    webcontainerInstance.value = await WebContainer.boot({
      coep: 'credentialless'
    });
  }
  serverProcess.value = 0;
  console.log(file);
  await webcontainerInstance.value.mount(file);
  const exitCode = await installDependencies();
  if (exitCode !== 0) {
    throw new Error('Installation failed');
  }
  startDevServer();
}

const getDistFiles = async () => {
  const files = await webcontainerInstance.value.fs.readdir('dist');
  return files;
}

const buildFile = async () => {
  const buildProcess = await webcontainerInstance.value.spawn('npm', ['run', 'build']);
  buildProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  return buildProcess.exit;
}

async function build() {
  if (buildLoading.value) return;
  buildLoading.value = true;
  const exitCode = await buildFile()
  buildLoading.value = false;
  if (exitCode !== 0) {
    throw new Error('Build failed');
  } else {
    const files = await getDistFiles();
    console.log(files, 'files')
    return files;
  }
}


const exportProcess = async () => {
  const process = await webcontainerInstance.value.spawn('npm', ['run', 'export']);
  process.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  return process.exit;
}

async function exportPdf() {
  if (exportPdfLoading.value) return;
  exportPdfLoading.value = true;
  const exitCode = await exportProcess()

  if (exitCode !== 0) {
    throw new Error('Build failed');
  } else {
    const targetFileData = webcontainerFs().readFile('slides-export.pdf', 'utf-8');
    console.log('Exported PDF', targetFileData);
  }
}


export {
  mount,
  iframeSrc,
  webcontainerInstance,
  getInitalContent,
  serverProcess,
  serverProcessMap,
  webcontainerFs,
  build,
  buildLoading,
  exportPdf,
  exportPdfLoading
}