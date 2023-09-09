<!--
  级联按钮
  tit:label名
  width:label宽度 默认110
  disabled：是否禁用
  @switchChange:改变switch的值触发，并向外抛出
-->
<template>
  <div class="cascade-btn">
    <div class="cascade-label" :style="{ width: labelWidth + 'px' }">{{ it.tit }}</div>
    <div class="cascade-option">
      <span
        @click="handleChange(index)"
        :class="{
          'active-btn': current === index
        }"
        v-for="(op, index) in it.options"
        :key="index"
        >{{ op }}</span
      >
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  labelWidth: { type: Number, default: 100 },
  item: { type: Object, default: () => {} }
})
const emit = defineEmits(['switchChange', 'update:modelValue'])
const val = ref(props.modelValue)
const it = ref(props.item)
const current = ref(0)
// 监听控件输入事件 并更新绑定值
const handleChange = (index) => {
  emit('update:modelValue', index)
  current.value = index
  emit('cascadeChange', val, props.item.prop)
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
<style lang="scss" scoped>
.cascade-btn {
  margin-bottom: 18px;
  display: flex;
  .cascade-label {
    height: 32px;
    text-align: right;
    line-height: 32px;
    font-size: 14px;
    margin-right: 12px;
    box-sizing: border-box;
  }
  .cascade-option {
    height: 32px;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 6px;
    span {
      display: inline-block;
      padding: 0 12px;
      cursor: pointer;
      border: 1px solid #e5e8ef;
      height: 32px;
      line-height: 32px;
    }
    span:nth-child(odd) {
      border-right: none;
    }
    span:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    span:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-left: none;
      border-right: 1px solid #e5e8ef;
    }
  }
}

.active-btn {
  color: white;
  background-color: #409eff;
  border: 1px solid #409eff;
}
</style>
