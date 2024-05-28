import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import os from 'os';
import pkg from '../package.json'
const TEMP_DIR = path.join(os.tmpdir(), 'slidev-build-service');

// 构建一个package.json文件，用于安装Slidev
const createPackageJson = async () => {
  const packageJson = {
    "name": 'slidev-temp',
    "version": pkg.version,
    "description": 'Slidev temp project',
    "scripts": {
      "start": 'slidev',
    },
    "keywords": ['slidev', 'slidev-temp'],
    "type": 'module',
    "dependencies": {
      "@slidev/cli": "^0.49.3",
      "@slidev/theme-default": "^0.25.0"
    }, 
  }
  await fs.writeFileSync(path.join(TEMP_DIR, 'package.json'), JSON.stringify(packageJson, null, 2));
}

const getResourcesPath = ()=> {
  const isDev = process.env.NODE_ENV === 'development';
  const resourcesPath = isDev ? path.join(__dirname, 'slidev-temp') : path.join(process.resourcesPath, 'slidev-temp');
  return resourcesPath;
}

const copyFils = async () => {
  // 将process.resourcesPath的目录下的文件拷贝到临时目录内
  const resourcesPath = getResourcesPath();
  try {
    await createPackageJson();
    await fs.copy(resourcesPath, TEMP_DIR, { overwrite: true });
    console.log('拷贝完成');
  } catch (err) {
    console.error('拷贝过程中发生错误:', err);
  }
}


const startSlidev = () => {
  // 启动 Slidev 服务
  const slidevProcess = exec(`npx slidev`, { cwd: TEMP_DIR });

  slidevProcess.stdout.on('data', (data) => {
    console.log(`Slidev: ${data}`);
  });

  slidevProcess.stderr.on('data', (data) => {
    console.error(`Slidev error: ${data}`);
  });

  slidevProcess.on('close', (code) => {
    console.log(`Slidev process exited with code ${code}`);
  });
}


export const createSlidevServer = async () => {
  // 创建临时目录
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR);
  }
  // 读取临时目录内的版本信息，如果版本信息不一致，删除临时目录，重新下载，如果一致，直接启动 Slidev 服务
  // HACK 由于 Slidev 服务启动后会占用端口，导致无法重新启动，所以这里每次启动服务前都会删除临时目录
  // HACK 考虑版本检查，如果版本不一致，删除临时目录，重新下载
  if (fs.existsSync(path.resolve(TEMP_DIR, 'node_modules/@slidev/cli'))) {
    console.log('Slidev already installed.');
    startSlidev();
  } else {
    await copyFils()
    exec('npm install', { cwd: TEMP_DIR }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error installing Slidev: ${stderr}`);
        return;
      }
      console.log('Slidev installed successfully.');
      startSlidev();
    });
  }
}