import { WebContainer } from '@webcontainer/api'
import { ref } from 'vue'
let webcontainerInstance: WebContainer;
const files = {
  'slides.md': {
    file: {
      contents: `
        # Hello Slidev
        ---
        ## Slide 2
        ---
        ## Slide 3
      `
    }
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "example-app",
          "type": "module",
          "dependencies": {
            "@slidev/cli": "^0.49.2",
            "@slidev/theme-default": "^0.25.0",
          },
          "scripts": {
            "slidev": "slidev"
          }
        }`,
    },
  },
};

async function installDependencies() {
  // Install dependencies
  const installProcess = await webcontainerInstance.spawn('yarn', ['install']);
  // Wait for install command to exit
  return installProcess.exit;
}
const iframeUrl = ref('');
async function startDevServer() {
  const startProcess = await webcontainerInstance.spawn('npx', ['slidev']);
  startProcess.output.pipeTo(new WritableStream({
    write(chunk) {
      console.log(chunk.toString());
    }
  }));
  webcontainerInstance.on('server-ready', (port, url) => {
    console.log('Server is ready', url);
    iframeUrl.value = url;
  });
  return webcontainerInstance
}


const init = async () => {
  window.addEventListener('load', async () => {
    webcontainerInstance = await WebContainer.boot()
    await webcontainerInstance.mount(files);
    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error('Installation failed');
    }
    startDevServer();
  })
}
export {
  init,
  webcontainerInstance,
  iframeUrl
};