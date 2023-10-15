<!-- 首页 -->
<template>
  <div class="common-layout">
    <el-container>
      <!-- 菜单 -->
      <el-aside width="200px">
        <zl-menu />
      </el-aside>
      <!-- 内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import ZlMenu from '@/views/layout/ZlMenu.vue'
</script>
<style scoped></style>
