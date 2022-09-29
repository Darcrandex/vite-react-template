import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')

  return {
    plugins: [
      react(),
      createStyleImportPlugin({ libs: [AntdResolve()] }),
      createHtmlPlugin({
        minify: true,
        inject: { data: { BUILD_DATE: new Date().toLocaleString('chinese', { hour12: false }) } },
      }),
    ],

    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      host: true,
      proxy: {
        [env.VITE_APP_API_PREFIX]: {
          target: env.VITE_APP_API_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_API_PREFIX}`), ''),
        },
      },
    },

    css: {
      preprocessorOptions: {
        less: { javascriptEnabled: true },
      },
    },

    resolve: { alias: { '@': path.resolve(__dirname, './src'), src: path.resolve(__dirname, './src') } },
    base: './',
  }
})
