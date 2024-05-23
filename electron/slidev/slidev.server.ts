import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import os from 'os';

const TEMP_DIR = path.join(os.tmpdir(), 'slidev-build-service');
const copyFils = async () => {
  // 将process.resourcesPath的目录下的文件拷贝到临时目录内
  const resourcesPath = path.join(process.resourcesPath, 'slidev');
  try {
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
  // 如果你的电脑上已经安装了 Slidev，可以跳过这一步
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