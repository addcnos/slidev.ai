import { app } from 'electron';
import express from 'express';
import path from 'path';

export const createExpress = async () => {
  if (!app.isPackaged) return
  const server = express();
  // 设置跨域隔离头
  server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });
  server.use(express.static(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/`)));
  server.listen(3030, () => {
    console.log(`Server running at http://localhost:${3030}/`);
  });
}
