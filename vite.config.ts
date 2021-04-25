import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginImp from 'vite-plugin-imp'
import path from 'path'
import fs from 'fs'
import lessToJS from 'less-vars-to-js'

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/variables.less'), 'utf8'),
)

// 获取环境变量
/* const env = process.argv[process.argv.length - 1] */

export default defineConfig({
  base: '/reactAdmin/',
  resolve: {
    // 路径别名
    alias: [
       { find: /^@src/, replacement: path.resolve(__dirname, 'src') },
    ],
  },
  /* 跨域转发 */
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://www.web-jshtml.cn/api/react',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    reactRefresh(),
     /* vitePluginImp({
      // 按需引入, 有bug 引不全
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }), */
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 配置变量，重写样式
        modifyVars: {
          ...themeVariables,
        },
      },
    },
  },
})
