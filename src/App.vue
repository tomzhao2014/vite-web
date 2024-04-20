<!--根组件-->
<template>
  <!-- <router-link to="/index">Hello World</router-link> -->
    <!-- 添加更多导航链接 -->
    <router-view></router-view> <!-- 路由组件将在这里渲染 -->
  
</template>

<script lang="ts" setup>
import {  ref, onMounted } from 'vue'
const count = ref(0)
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>