<!-- 
    modelValue:选择的值
    items:选项  [1,2,3,4,5] [{key:'',value:''},{key:'',value:''}]  
                [{any1:'',any2:''},{any1:'',any2:''}]
    itemsKv:选择去值的key  当 items = [{any1:'',any2:''},{any1:'',any2:''}] itemsKv['any1','any2']

    reIndex: 返回值选择  当 [1,2,3,4,5]  是默认返回  下标   reIndex false 的时候返回 选择的值

 -->
<template>
  <div>
    <div class="cascade-option">
      <span
        v-for="(op, index) in items"
        :key="index"
        :class="{
          'active-btn': reIndexFlag && props.reIndex ? val == index : val == op.key
        }"
        @click="handleChange(index, op.key)"
        >{{ op.value }}</span
      >
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  items: {
    type: [Array, Object],
    default: () => {
      return []
    }
  },
  itemsKv: {
    type: Array,
    default: () => {
      return ['key', 'value']
    }
  },
  reIndex: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['onChange', 'update:modelValue'])
const val = ref(props.modelValue)
let reIndexFlag = false
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
    reIndexFlag = true
    items_tmp.forEach((str) => {
      itemList.push({ key: str, value: str })
    })
  } else if (isRef(items_tmp)) {
    itemList = items_tmp
  }
  return itemList
})

// 监听控件输入事件 并更新绑定值
const handleChange = (index, key) => {
  if (reIndexFlag && props.reIndex) {
    val.value = index
  } else {
    val.value = key
  }
  emit('change', index, val.value)
  emit('update:modelValue', val.value)
}

defineExpose({
  val
})
</script>
<style lang="scss" scoped>
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
.active-btn {
  color: white;
  background-color: #409eff;
  border: 1px solid #409eff;
}
</style>
