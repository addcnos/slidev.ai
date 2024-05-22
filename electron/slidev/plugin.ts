import type { Plugin } from 'vite'
import path from 'path'
const FusesPlugin = () => {
  return {
    name: 'slidev-fuses',
    config(config, env) {
      if (env.command === 'build') {
          config.build.rollupOptions= {
            ...config.build.rollupOptions,
            input:[ path.resolve(__dirname, './slidev.server.ts'), path.resolve(__dirname, '../main.ts')],
            output:{
              format: 'cjs',
              entryFileNames: '[name].js',
              chunkFileNames: '[name].js',
            }
          }
      }
    },
  } as Plugin
}
export default FusesPlugin