import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer, alias } from './vite.base.config';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [vue(), pluginExposeRenderer(name)],
    resolve: {
      preserveSymlinks: true,
      alias,
    },
    server: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
      proxy: {
        'http://api.com': {
          target: 'https://one-api.system.addcn.com',
          changeOrigin: true,
          rewrite: (path) => {
            console.log(1)
            return path.replace(/^http:\/\/api\.com/, '')
          },
        },
      }
    },
    clearScreen: false,
  } as UserConfig;
});
