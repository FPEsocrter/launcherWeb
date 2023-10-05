<!--
  tit:label名
  prop:规则验证的位置
  rules：验证规则
  type：输入框类型（密码框、文本框）
  show-password：是否显示密码框 的 文本显示icon（存在inputType属性既开启）
  placeholder：占位符，默认‘请输入’
  disabled：是否禁用
  emptyLabel:小红点是否隐藏
  @changeInput:当输入框 文字发生变化，触发函数向外抛出
-->
<template>
  <el-form-item :class="{ 'empty-label': it.emptyLabel ? true : false }" :label="it.tit" :prop="it.prop" :rules="it.rules ? it.rules : ''">
    <el-input
      v-model.trim="val"
      :disabled="it.disabled ? it.disabled : false"
      :placeholder="it.placeholder ? it.placeholder : placeholder"
      :show-password="it.inputType ? true : false"
      :type="it.type ? it.type : ''"
      @input="handleInput"
      :rows="2"
    />
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  item: { type: Object, default: () => {} },
  placeholder: { typ: String, default: '请输入' }
})
const emit = defineEmits(['changeInput', 'update:modelValue'])
const val = ref(props.modelValue)

const it = ref(props.item)
// 监听控件输入事件 并更新绑定值
const handleInput = (value) => {
  emit('update:modelValue', value)
  emit('changeInput', it.value.prop)
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
<style lang="scss">
.empty-label.el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label-wrap > .el-form-item__label:before,
.empty-label.el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label:before {
  content: '' !important;
}
</style>
