import { app } from 'electron';
import fs from 'fs-extra';
import path from 'path';

// 创建日志文件
export const writeLog = (message: string) => {
  const LOG_FILE_PATH = path.join(app.getPath('userData'), 'logs');
  const logFilePath = path.join(LOG_FILE_PATH, 'app.log')
  // 确保日志目录存在
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.mkdirSync(LOG_FILE_PATH);
  }
  // 写入日志信息
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
}