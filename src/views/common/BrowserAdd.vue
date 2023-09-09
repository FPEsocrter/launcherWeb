<!-- 新建浏览器-按钮 -->
<template>
  <div class="add-content" @click="handleClick">
    <icon-font icon="icon-icon1" />
    <span>新建浏览器</span>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const emit = defineEmits(['click-add'])

// 跳转至新建页面
const handleClick = () => {
  router.push('/browser_add')
  emit('click-add')
}
</script>

<style lang="scss" scoped>
.add-content {
  height: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: white;
  border-radius: 8px;
  background-color: #1e4dff;
  cursor: pointer;
  a {
    margin-right: 10px;
  }
}
</style>
