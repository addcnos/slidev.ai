import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'

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