import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
/* import vitePluginImp from 'vite-plugin-imp' */

// 获取环境变量
const env = process.argv[process.argv.length - 1]

export default defineConfig({
  /* base: '/music', */
  resolve: {
    // 路径别名
    alias: [
       { find: /^~/, replacement: '/src' },
    ],
  },
  plugins: [
    reactRefresh(),
     /* vitePluginImp({
      // 按需引入
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    }), */
  ],
  /* css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 配置变量，重写样式
        modifyVars: {
          '@primary-color': '#EC4141',
        },
      },
    },
  }, */
})
