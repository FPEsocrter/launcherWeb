<!--
  tit:label名
  width:label宽度 默认110
  disabled：是否禁用
  @switchChange:改变switch的值触发，并向外抛出
-->
<template>
  <el-form-item :label="it.tit" :prop="it.prop" :rules="it.rules">
    <el-switch v-model="val" :disabled="item.disabled" @change="handleChange" />
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  item: { type: Object, default: () => {} }
})
const emit = defineEmits(['switchChange', 'update:modelValue'])
const val = ref(props.modelValue)
const it = ref(props.item)

// 监听控件输入事件 并更新绑定值
const handleChange = (value) => {
  emit('update:modelValue', value)
  emit('switchChange', val, props.item.prop)
}

// 监听value值
watch(
  () => [props.modelValue, props.item],
  (newValue) => {
    val.value = newValue[0]
    it.value = newValue[1]
  }
)

defineExpose({
  val
})
</script>
<style lang="scss"></style>
