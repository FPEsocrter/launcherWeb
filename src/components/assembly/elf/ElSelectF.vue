<!--
  modelValue: v-model 的值 双向绑定

  所有efi_ 都是绑定在 el-form-item 标签上
  否则都是绑定在el-select

  支持 slot  openBefore openAfter
-->
<template>
  <el-select>
    <slot name="prefix"></slot>
    <el-option v-for="(option, index) in items" :key="index" :label="option.key" :value="option.value" />
    <slot name="openAfter"></slot>
  </el-select>
</template>
<script setup>
const props = defineProps({
  items: {
    type: [Array, Object],
    default: () => {
      return []
    }
  },
  itemsKv: {
    type: [Array],
    default: () => {
      return ['key', 'value']
    }
  }
})
const items = computed(() => {
  let itemList = []
  let items_tmp = props.items
  if (typeof items_tmp === 'object' && !Array.isArray(items_tmp)) {
    Object.keys(items_tmp).forEach((str) => {
      itemList.push({ key: str, value: items_tmp[str] })
    })
  } else if (Array.isArray(items_tmp) && items_tmp.length > 0 && typeof items_tmp[0] == 'object') {
    items_tmp.forEach((obj) => {
      itemList.push({ key: obj[props.itemsKv[0]], value: obj[props.itemsKv[1]] })
    })
  } else if ((Array.isArray(items_tmp) && items_tmp.length > 0 && typeof items_tmp[0] == 'string') || typeof items_tmp[0] == 'number') {
    items_tmp.forEach((str) => {
      itemList.push({ key: str, value: str })
    })
  } else if (isRef(items_tmp)) {
    itemList = items_tmp
  }
  return itemList
})
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
