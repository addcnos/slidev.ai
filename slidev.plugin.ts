import type { Plugin } from 'vite'
import { mergeConfig } from 'vite'
// import commonjs from '@rollup/plugin-commonjs';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

const SlidevPreBuildPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-slidev-prebuild',
    config: (config) => {
      const newConfig =  mergeConfig(config, { 
        build: {
          rollupOptions: {
            // input: 'node_modules/@slidev/cli/dist/index.mjs',
            // output: {
            //   format: 'cjs',
            //   dir: 'dist',
            //   entryFileNames: '[name].js',
            // },
            // plugins: [
            //   nodeResolve(),
            //   commonjs(),
            // ],
          },
        }
      }, false)
      
      return newConfig
    }
  }
}

export default SlidevPreBuildPlugin