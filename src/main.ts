/** 引入VUE */
import { createApp } from 'vue'
/** 引入PINIA */
import { createPinia } from 'pinia'

import i18n, { elementPlusLocale } from './lang'

/** 引入样式 */
import './style.css'
/** 引入根组件 */
import App from './App.vue'
/** 引入路由配置 */
import router from './router'; 
/** 引入饿了么前端框架 */
import ElementPlus from 'element-plus'
/** 引入饿了么前端框架样式 */
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
/** 使用饿了么前端框架 */
app.use(ElementPlus,{ locale: elementPlusLocale() })
app.use(i18n);
console.log(import.meta.env)
/** 使用PINIA */
app.use(createPinia())
/** 使用路由配置 */
app.use(router);
/** 挂载页面 */

app.mount('#app');

app.config.errorHandler = (err) => {
    /* 处理错误 */
}
  app.config.globalProperties.$myGlobalMethod = () => {
    /* 全局方法 */
  }

app.component('TodoDeleteButton', {})


