import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const isProd = command === 'build'
  const config = {
    mode: isProd ? 'production' : '',
    server: {
      port: 8080,
    },
    plugins: [vue()],
  }

  if (mode === 'demo') {
    config.root = `${process.cwd()}/demo`
    config.build = {
      outDir: `${process.cwd()}/dist`,
      emptyOutDir: true,
    }
  }

  if (mode === 'lib') {
    config.build = {
      outDir: 'lib',
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: path.resolve(__dirname, 'src/index.js'),
        name: 'VueInlineSvg',
        formats: ['es', 'cjs', 'iife'],
      },
      terserOptions: {
        ecma: 5,
      },
    }
  }

  return defineConfig(config)
}
