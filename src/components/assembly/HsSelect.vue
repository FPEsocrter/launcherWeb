<!--
  tit:label名
  prop:规则验证的位置
  rules：验证规则
  allow-create：允许添加 没有的选项（filterable必须为true）
  filterable:可搜索
  default-first-option：按下回车，选中当前选项列表中的第一个
  disabled:是否禁用
  placeholder：占位符，默认‘请选择’
  multiple：是否多选
  collapse-tags：多选状态下，是否已一段文字显示多选的tag
  clearable：是否可清空,默认可清空
  isCrease:是否下拉可添加删除[特别属性]
  isCreaseAss:是否下拉 添加是否显示[特别属性]
  isCreaseDel:是否下拉 删除是否显示[特别属性]
  addRules:存在isCrease，必须要传入rules，由{reg:规则,message:错误信息组成}
  closeKey:带有输入框的选择框 需要传入弹窗的visible值[否则 如未关闭 直接关弹窗 会导致报错]
  width:选择框长度[不写默认100%]
  @selectChange:改变选项 触发 向外抛
-->
<template>
  <el-form-item :label="it.tit" :prop="it.prop" :rules="it.rules">
    <el-select
      v-model="val"
      :allow-create="it.create ? it.create : false"
      :clearable="typeof it.clearable == 'undefined' ? defaultClearable : it.clearable"
      :collapse-tags="it.collapse ? it.multiple : true"
      :collapse-tags-tooltip="it.collapse ? it.multiple : true"
      :default-first-option="it.choiceFirst"
      :disabled="it.disabled ? it.disabled : false"
      :filterable="it.create ? it.create : it.filterable"
      :multiple="it.multiple ? it.multiple : false"
      :placeholder="it.placeholder ? it.placeholder : '请选择'"
      :style="{ width: it.width ? it.width + 'px' : '100%' }"
      @change="handleSelect"
      @focus="handleFocus"
    >
      <template v-if="it.isCrease">
        <div v-if="!isInput" class="option-add" @click="handleAddBtn"><icon-font icon="icon-jia" />新增</div>
        <div v-else class="option-input">
          <span v-if="!compliant" class="input-rules-text">{{ it.addRules.message }}</span>
          <el-input v-model="inputVal" />
          <span v-if="it.isCreaseAdd" class="option-input-btn" @click="handleAdd">添加</span>
        </div>
        <el-option v-for="(option, index) in it.options" :key="index" class="tet" :label="option.key" :value="option.value">
          <span style="float: left">{{ option.key }}</span>
          <span v-if="it.isCreaseDel" style="float: right" @click.stop="handleDelete(option.value)">
            <icon-font icon="icon-lajitong-xianxing" />
          </span>
        </el-option>
      </template>
      <template v-else>
        <el-option v-for="(option, index) in it.options" :key="index" class="tet" :label="option.key" :value="option.value" />
      </template>
      <!-- 下拉选项为空时 默认只显示添加按钮 -->
      <template v-if="it.options && it.isCrease" #empty>
        <div v-if="!isInput" class="option-add" @click="handleAddBtn"><icon-font icon="icon-jia" />新增</div>
        <div v-else class="option-input">
          <span v-if="!compliant" class="input-rules-text">{{ it.addRules.message }}</span>
          <el-input v-model="inputVal" />
          <span v-if="it.isCreaseAdd" class="option-input-btn" @click="handleAdd">添加</span>
        </div>
      </template>
    </el-select>
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  closeKey: { type: Boolean, default: false },
  item: { type: Object, default: () => {} },
  defaultClearable: { type: Boolean, default: true }
})
const emit = defineEmits(['selectChange', 'update:modelValue', 'inputAdd', 'optionDelete'])
const val = ref(props.modelValue)
const it = ref(props.item)

// select的焦点事件
const handleFocus = () => {
  isInput.value = false
  inputVal.value = ''
}

// select的失焦事件
// const handleBlur = (e) => {
//   let selectArr = Array.from(document.getElementsByClassName('el-select__popper'))
//   let isExist = false
//   selectArr.forEach((item) => {
//     if (item.contains(e.relatedTarget)) {
//       isExist = true
//       return
//     }
//   })
//   isExist ? '' : handleFocus()
// }

// 监听控件输入事件 并更新绑定值
const handleSelect = (value) => {
  emit('update:modelValue', value)
  emit('selectChange', val, props.item.prop)
  handleFocus()
}

const inputVal = ref('')
const isInput = ref(false)

// 添加框是否符合规则
const compliant = computed(() => {
  let reg = props.item.addRules.reg
  return reg.test(inputVal.value)
})

// 下拉-点击添加
const handleAdd = () => {
  if (!compliant.value) return

  // 为空 不添加
  if (inputVal.value) {
    emit('inputAdd', { prop: props.item.prop, val: inputVal.value })
    inputVal.value = ''
  }
}

const handleAddBtn = () => {
  isInput.value = true
}

// 单选 删除
const handleDelete = (value) => {
  emit('optionDelete', { prop: props.item.prop, optionId: value })
}

// 监听value值
watch(
  () => [props.modelValue, props.item],
  (newValue) => {
    val.value = newValue[0]
    it.value = newValue[1]
  }
)

// 关闭下拉选择框需要时间，如未关闭 直接关弹窗 会导致报错[带有输入框的选择框 需要传入弹窗的visible值]
watch(
  () => props.closeKey,
  (newValue) => {
    isInput.value = newValue
  }
)

defineExpose({
  val
})
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.option-add {
  cursor: pointer;
  text-align: center;
  height: 36px;
  line-height: 36px;
  color: #333333;
  font-size: 14px;
}
.option-add:hover {
  color: #6094ef;
  background-color: transparent;
}

.option-input {
  position: relative;
  padding: 5px 20px 0;
  height: 52px;
  display: flex;
  box-sizing: border-box;
  // align-items: center;
  .el-input {
    height: 26px;
    .el-input__wrapper {
      font-size: 12px;
    }
    :deep(.el-input__inner) {
      height: 26px;
    }
  }
  .option-input-btn {
    cursor: pointer;
    width: 52px;
    background-color: #1d67e8;
    border-radius: 4px;
    color: white;
    height: 26px;
    display: inline-block;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    margin-left: 8px;
  }
  .input-rules-text {
    color: #f56c6c;
    left: 26px;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    line-height: 12px;
    height: 12px;
  }
}
</style>
