import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import { pluginExposeRenderer, alias } from './vite.base.config';
import vue from '@vitejs/plugin-vue';
import dotenv from "dotenv";
dotenv.config();

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
    plugins: [
      vue(),
      pluginExposeRenderer(name),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      })
    ],
    resolve: {
      preserveSymlinks: true,
      alias,
    },
    server: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      }
    },
    clearScreen: false,
    define: {
      OPENAI_API_KEY: `"${process.env.OPENAI_API_KEY}"`,
      SSH_PASSWORD: `"${process.env.SSH_PASSWORD}"`,
      SSH_USER: `"${process.env.SSH_USER}"`,
      SSH_HOST: `"${process.env.SSH_HOST}"`,
      SSH_PORT: `"${process.env.SSH_PORT}"`,
    }
  } as UserConfig;
});
