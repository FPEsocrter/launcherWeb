<template>
  <div class="support-content">
    <icon-font icon="icon-kefutubiao" @click="handleClick" />
    <give-feedback v-model="isShowCenter" />
  </div>
</template>
<script setup>
import GiveFeedback from './components/GiveFeedback.vue'

const isShowCenter = ref(false)

const handleClick = () => {
  console.log(123)
  isShowCenter.value = true
}
</script>
<style scoped lang="scss">
.support-content {
  position: absolute;
  bottom: 40px;
  left: 40px;
  background-color: #1e4dff;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-radius: 50%;
  cursor: pointer;
  a {
    display: inline-block;
    height: 100%;
    width: 100%;
    font-size: 28px;
    color: white;
  }
}
</style>
