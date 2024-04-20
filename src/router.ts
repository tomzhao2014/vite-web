import {createRouter,createWebHistory,RouteRecordRaw } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Login from './views/Login.vue'
const routes:Array<RouteRecordRaw> = [
    {
        path: '/index',
        name: 'Home',
        component: HelloWorld,
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      }
      // 可以根据需要添加更多路由
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;