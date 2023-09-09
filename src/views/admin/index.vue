<!-- 后台管理 -->
<template>
  <div class="layout-admin">
    <!-- 菜单 -->
    <div class="layout-menu">
      <zl-menu />
    </div>
    <!-- 内容 -->
    <div class="layout-content">
      <div class="layout-content-right-title">{{ meta.title }}</div>
      <div class="layout-content-right-form">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup>
import ZlMenu from '@/views/layout/ZlMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 当前路由
const meta = computed(() => {
  return route.meta
})
</script>
<style lang="scss" scoped>
.layout-admin {
  background: #f9f9f9;
  height: 100%;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  .layout-menu {
    width: 280px;
    padding: 0 10px;
    background-color: white;
  }
  .layout-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .layout-content-right-title {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-weight: 700;
      padding-left: 10px;
    }
    .layout-content-right-form {
      height: calc(100% - 40px);
    }
  }
}
</style>
