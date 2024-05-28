import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import { app } from 'electron';
import pkg from '../package.json'
const TEMP_DIR = path.join(app.getPath('userData'), 'slidev-local-service');
const LOG_FILE_PATH = path.join(app.getPath('userData'), 'logs');

// 创建日志文件
const writeLog = (message: string) => {
  const logFilePath = path.join(LOG_FILE_PATH, 'app.log')
  // 确保日志目录存在
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.mkdirSync(LOG_FILE_PATH);
  }
  // 写入日志信息
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

// 测试写一个30秒更新一次slides.md的内容
const updateSlides = () => {
  const slidesPath = path.join(TEMP_DIR, 'slides.md');
  let count = 0;
  setInterval(() => {
    count++;
    fs.writeFileSync(slidesPath, `# Slide ${count}\n\nThis is slide ${count}`);
  }, 10000);
}

// 构建一个package.json文件，用于安装Slidev
const createPackageJson = async () => {
  const packageJson = {
    "name": 'slidev-temp',
    "version": pkg.version,
    "description": 'Slidev temp project',
    "scripts": {
      "dev": 'slidev',
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

const getResourcesPath = () => {
  const isDev = process.env.NODE_ENV === 'development';
  const resourcesPath = isDev ? path.join(__dirname, '../../slidev-temp') : path.join(process.resourcesPath, 'slidev-temp');
  return resourcesPath;
}

const copyFils = async () => {
  // 将process.resourcesPath的目录下的文件拷贝到临时目录内
  const resourcesPath = getResourcesPath();
  try {
    await createPackageJson();
    await fs.copy(resourcesPath, TEMP_DIR, { overwrite: true });
    writeLog('拷贝完成');
  } catch (err) {
    writeLog('拷贝过程中发生错误' + JSON.stringify(err));
  }
}

const startSlidev = () => {
  // 启动 Slidev 服务
  const slidevProcess = exec('yarn dev', { cwd: TEMP_DIR });

  slidevProcess.stdout.on('data', (data) => {
    writeLog(`Slidev: ${data}`);
  });

  slidevProcess.stderr.on('data', (data) => {
    writeLog(`Slidev error: ${data}`);
  });

  slidevProcess.on('close', (code) => {
    writeLog(`Slidev process exited with code ${code}`);
  });
  updateSlides();
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
    writeLog('Slidev already installed.');
    startSlidev();
  } else {
    await copyFils()
    const yarnPath = path.join(TEMP_DIR, 'scripts/yarn.cjs');
    exec(`node "${yarnPath}" install`, { cwd: TEMP_DIR }, (error, stdout) => {
      if (error) {
        writeLog(`Error installing Slidev: ${error}`);
        return;
      }
      writeLog(`Slidev installed successfully: ${stdout}`);
      startSlidev();
    }
    );
  }
}