import { app, BrowserWindow } from 'electron';
import express from 'express';
import path from 'path';
import fs from 'fs-extra';
import { openaiProxy } from './openai'
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'

const LOG_FILE_PATH = path.join(app.getPath('userData'), 'logs');
// 创建日志文件
export const writeLog = (message: string) => {
  const logFilePath = path.join(LOG_FILE_PATH, 'app.log')
  // 确保日志目录存在
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.mkdirSync(LOG_FILE_PATH);
  }
  // 写入日志信息
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}

export const createExpress = async () => {
  // if (!app.isPackaged) return
  const server = express();

  server.use(cors({
    origin: 'http://localhost:5173', // 允许的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    credentials: true, // 如果需要发送凭证（如 cookies）
  }));

  // 配置代理中间件
  server.use('/api', createProxyMiddleware({
    target: 'https://one-api.system.addcn.com/v1',
    changeOrigin: true,
  }));

  server.use(express.static(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/`)));
  server.listen(3030, () => {
    console.log(`Server running at http://localhost:${3030}/`);
  });
}

// 根据本地的slidev-temp目录，将其生成对应的数据
export const slidevTempFiles = async () => {
  const slidevTempPath = app.isPackaged ? path.join(process.resourcesPath, 'slidev-temp') : path.join(__dirname, '../../slidev-temp');
  const targetObj = {};
  const lockNames = ['yarn.lock', 'package-lock.json', 'pnpm-lock.yaml']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse = (dir: string, obj: any) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file === 'node_modules' || lockNames.includes(file)) return;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        obj[file] = { directory: {} };
        traverse(filePath, obj[file].directory);
      } else {
        obj[file] = {
          file: {
            contents: new Uint8Array(fs.readFileSync(filePath))
          }
        };
      }
    });
  }
  traverse(slidevTempPath, targetObj);
  return targetObj;
}

export interface ModelOption {
  url: string;
}

export const createModel = async (main: BrowserWindow, option: ModelOption) => {
  const view = new BrowserWindow({
    parent: main,
    modal: true,
    show: false,
    webPreferences: {
      devTools: false,
      webSecurity: false,
    }
  });
  view.webContents.loadURL(option.url)
  view.once('ready-to-show', () => {
    view.show();
  })
}
