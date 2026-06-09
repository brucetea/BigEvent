import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/base': {
        target: 'https://big-event-vue-api-t.itheima.net',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/base/, '') // 重写路径，去掉 /api 前缀
      }
      // '/base/api': {
      //   target: 'https://big-event-vue-api-t.itheima.net',
      //   changeOrigin: true, // 允许跨域
      //   rewrite: (path) => path.replace(/^\/base/, '') // 重写路径，去掉 /api 前缀
      // },
      // '/base/my': {
      //   target: 'https://big-event-vue-api-t.itheima.net',
      //   changeOrigin: true, // 允许跨域
      //   rewrite: (path) => path.replace(/^\/base/, '') // 重写路径，去掉 /api 前缀
      // }
    }
  } 
})
