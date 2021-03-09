import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy'
import styleImport from 'vite-plugin-style-import'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const proxyPrefix = env['VITE_APP_PROXY_PREFIX']

  return {
    plugins: [
      reactRefresh(),
      // 兼容性处理
      legacy({ targets: ['defaults', 'not IE 11'] }),
      styleImport({
        libs: [
          {
            // antd(组件)样式按需加载
            libraryName: 'antd',
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`
            },
          },
        ],
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
          // 基于less-loader 8.x
          // 用来允许less使用变量
          javascriptEnabled: true,

          // 在所有的'less'文件前添加一段代码(引入全局变量)
          // 具体用法请参考: https://www.npmjs.com/package/less-loader#additionalData
          additionalData: `@import '@/styles/variables.less';`,

          // 自定义antd样式
          // 由于使用了按需加载,antd官方提供的自定义样式修改方式在这里就不能用了
          // 使用less-loader提供的选项,全局修改less文件中的变量值
          // 注意:要修改的变量名会与上述'less全局变量'冲突

          // 这里只是修改了主题色, '@theme-color' 的值来源于 '@/styles/variables.less';'
          // 是为了方便后续修改, 也可以使用一般的css属性值(eg: #ff0000)
          modifyVars: { '@primary-color': '@theme-color' },
        },
      },
    },

    build: {
      rollupOptions: {
        output: {
          // 这里是把 'antd' 单独打成一个包(js部分)
          manualChunks: {
            antd: ['antd'],
          },
        },
      },
    },

    server: {
      port: 1616,
      proxy: {
        // 默认的开发代理
        [proxyPrefix]: {
          target: 'https://cnodejs.org/api/v1',
          changeOrigin: true,
          rewrite: (p) => p.replace(new RegExp(`\^${proxyPrefix}`), ''),
        },

        // 自定义代理(需要符合自定义代理规则,会影响'@/utils/http.js'中的'withProxy')
        // 在这里没有做校验,是为了放宽自定义的配置
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
