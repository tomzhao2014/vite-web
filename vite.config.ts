import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import  getProxyConfig from './build/proxy.cts';

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, `${process.cwd()}/env`, '')
  // 为什么要这样做，是为了 process.env和mode一致性
  Object.assign(process.env, env, { NODE_ENV: mode })
  console.log( process.env.NODE_ENV);
  return {
     // env配置文件变量前缀， 默认 VITE_，可自行定义
  envPrefix: 'SYS_',
  // env配置文件夹位置
  envDir: 'env',
  plugins: [vue(), vueJsx()],
  css: {
    preprocessorOptions: {
      // less: {
      //     javascriptEnabled: true,
      //     additionalData:  `@import "${resolve(__dirname, 'src/assets/styles/base.less')}";`
      // }
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('src/assets/styles/variables.less')}";`,
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    // host设置为true才可以使用network的形式，以ip访问项目
    host: true,
    // 本地编译后访问的端口号
    port: 8082,
    // 编译后是否自动打开浏览器访问
    open: true,
    hmr: {
      overlay: false
    },
    // 跨域设置允许
    cors: true,
    // 如果端口已占用直接退出
    strictPort: false,
    // 设置代理
    proxy: getProxyConfig()
  },
  build: {
    minify: "terser", // 必须开启：使用 terserOptions 才有效果
	    terserOptions: {
	      compress: {
	        drop_console: process.env.NODE_ENV === 'production' ? true : false, // 也可直接使用mode进行判断
          drop_debugger: process.env.NODE_ENV === 'production' ? true : false,
	      },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
