import { defineConfig } from 'tsup'

export default defineConfig({
  format: ['cjs', 'esm'],
  target: 'node20'
})