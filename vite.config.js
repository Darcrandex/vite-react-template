import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const proxyPrefix = env['VITE_APP_PROXY_PREFIX']

  return {
    plugins: [
      reactRefresh(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],

    resolve: {
      // 别名
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // 在所有的'less'文件前添加一段代码(引入全局变量)
          additionalData: `@import '@/styles/variables.less';`,
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          // 这里是把 'antd' 单独打成一个包
          manualChunks: {
            antd: ['antd'],
          },
        },
      },
    },

    server: {
      port: 1616,
      proxy: {
        [proxyPrefix]: {
          target: 'https://cnodejs.org/api/v1',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`\^${proxyPrefix}`), ''),
        },

        '/api-abc': {
          target: 'https://cnodejs.org/api/v1',
          rewrite: (p) => p.replace(/^\/api-abc/, ''),
        },
      },
    },

    // 打包之后,资源引用路径会使用相对路径
    base: './',
  }
})
