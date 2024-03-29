import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'
import commonjs from 'vite-plugin-commonjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: { data: { BUILD_DATE: new Date().toLocaleString('chinese', { hour12: false }) } },
      }),
      commonjs(),
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
