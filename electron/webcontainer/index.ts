import { ref } from 'vue'
import { WebContainer } from '@webcontainer/api'
import type { WebContainer as WebContainerInstance, FileSystemTree, FileSystemAPI } from '@webcontainer/api';
import { useIpcEmit } from '@renderer/composables'

const webcontainerInstance = ref<WebContainerInstance>(null);
const iframeSrc = ref('');
const serverProcess = ref(0)
const serverProcessMap = {
  0: '环境配置中，这可能需要一些时间...',
  1: '服务启动中，请稍候...',
  2: '读取页面配置中，马上就好...'
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


const buildFile = async () => {
  const buildProcess = await webcontainerInstance.value.spawn('npm', ['run', 'build', '--', '--base', `/${await useIpcEmit.getId()}/`]);
  buildProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));
  return buildProcess.exit;
}

async function getAllFiles(dir: string) {
  let files: { fullPath: string, name: string }[] = [];
  const items = await webcontainerFs().readdir(dir, {
    withFileTypes: true
  });

  for (const item of items) {
    const fullPath = `${dir}/${item.name}`;

    if (item.isDirectory()) {
      files = files.concat(await getAllFiles(fullPath));
    } else {
      files.push({
        fullPath,
        name: item.name
      });
    }
  }

  return files;
}

async function buildTreeRecursively(node: { name: string, children: { name: string }[] }) {
  const items = await webcontainerFs().readdir(node.name, {
    withFileTypes: true
  });

  for (const item of items) {
    const fullPath = `${node.name}/${item.name}`;


    if (item.isDirectory()) {
      const childNode = { name: fullPath, children: [] };
      node.children.push(childNode);
      await buildTreeRecursively(childNode);
    }
  }
}

async function getAllDirs(dir: string) {
  const rootNode = { name: dir, children: [] };
  await buildTreeRecursively(rootNode);
  return rootNode;
}

function normalizeDirName(dir: string, content: string) {
  return dir.replace('dist', `/export/${content}`);
}

function normalizeFileDirName(dir: string, content: string) {
  let newPath = dir.replace('dist', `/export/${content}`);
  const lastSlashIndex = newPath.lastIndexOf('/');
  newPath = newPath.substring(0, lastSlashIndex);
  return newPath
}

async function createLocalDir(dirMap: { name: string, children: { name: string }[] }, id: string) {
  await useIpcEmit.fileManager('mkdir', {
    dirName: normalizeDirName(dirMap.name, id)
  })
  if (dirMap.children?.length) {
    dirMap.children.forEach(async (child) => {
      await createLocalDir(child, id)
    })
  }
}

async function createLocalFile(paths: { fullPath: string, name: string }[], id: string) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico'];
  for (const _path of paths) {
    const isImage = imageExtensions.some(ext => _path.name.endsWith(ext));
    if (isImage) {
      const isAssetsImage = _path.fullPath.includes('assets');
      let _imageName = _path.name;
      // 如果是assets文件夹的图片，需要把名字后面去除9位
      if (isAssetsImage) {
        const [_name, _ext] = _imageName.split('.');
        _imageName = _name.slice(0, -9) + '.' + _ext;
      }
      const sourcePath = await useIpcEmit.fileManager('getUserFileDir', {
        dirName: `/assets/${_imageName}`
      }) as string
      const filePath = await useIpcEmit.fileManager('getUserFileDir', {
        dirName: normalizeDirName(_path.fullPath, id)
      }) as string
      await useIpcEmit.fileManager('copy', {
        sourcePath,
        filePath,
      })
    }
    else {
      const fileContent = await webcontainerFs().readFile(_path.fullPath, 'utf-8');
      await useIpcEmit.fileManager('write', {
        fileName: _path.name,
        content: fileContent,
        dirName: normalizeFileDirName(_path.fullPath, id)
      })
    }
  }
}

async function build() {
  if (buildLoading.value) return;
  buildLoading.value = true;
  let exitCode = 0;
  try {
    exitCode = await buildFile();
  } catch (e) {
    console.log(e, 'error')
  }
  if (exitCode !== 0) {
    buildLoading.value = false;
    return Promise.reject('Build failed');
  } else {
    const activeId = await useIpcEmit.getId();
    const paths = await getAllFiles('/dist')
    const dirMap = await getAllDirs('/dist')
    await useIpcEmit.fileManager('mkdir', {
      dirName: '/export'
    })
    console.log(paths, 'paths', activeId)
    await createLocalDir(dirMap, activeId)
    await createLocalFile(paths, activeId)

    const sourcePath = await useIpcEmit.fileManager('getUserFileDir', {
      dirName: `/export/${activeId}`
    }) as string;

    console.log(sourcePath, 'sourcePath')
    await useIpcEmit.sshUpdateFile({
      sourcePath,
      targetPath: `/home/htdocs/${activeId}`
    })
    buildLoading.value = false;
    Promise.resolve('Build success');
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
  exportPdfLoading,
}
