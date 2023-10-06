<!-- 就是维护了防抖功能,其他和 el-button一致  :onclick=""-->
<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
</template>
<script setup>
import { useThrottledRefHistory } from '@vueuse/core' //防抖
const emit = defineEmits(['click'])
const counter = ref(0)
const { history } = useThrottledRefHistory(counter, { deep: true, throttle: 1000 })
const handleClick = () => {
  counter.value++
}
watch(
  () => history.value,
  () => {
    emit('click')
  }
)
</script>
