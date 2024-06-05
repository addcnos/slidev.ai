import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware'
import cors from 'cors'

export const createExpress = async () => {
  const server = express();
  const getPort = await import('get-port').then((m) => m.default);
  const port = await getPort({ port: 3030 });

  server.use(cors({
    origin: 'http://localhost:5173', // 允许的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    credentials: true, // 如果需要发送凭证（如 cookies）
  }));

  // 设置 COOP 和 COEP 头
  server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });


  // 配置代理中间件
  server.use('/api', createProxyMiddleware({
    target: 'https://one-api.system.addcn.com/v1',
    changeOrigin: true,
  }));

  server.use(express.static(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/`)));
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  return { port }
}