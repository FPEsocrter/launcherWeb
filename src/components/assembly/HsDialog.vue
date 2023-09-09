<!-- 通用弹框
1.showType：显示模板，默认add模板,custom为自己定义模板，通过插槽名custom渲染
2. title标题，dialogFormVisible弹框是否显示，formLabelWidth弹框内表单的label长度
3.数据部分需要上层组件传递：form（表单数据）、formRules（表单规则）、formItem（控件类型定义）
4.向外抛一个createTemplet事件，当点击确认按钮时，根据规则进行校验。发送校验结果 提供上层组件进行下一步操作
5.监听弹窗关闭，在关闭时抛出事件cancal，通知上层弹窗已经关闭, 如是通过 确认按钮后->操作成功(此时清空表单需要通过ref,已向外抛出表单ref->ruleFormRef)
6.自定义弹窗点击确认，抛出事件confirmCustom，通知已点击确认
7.纯文本展示text 如法律法规，只抛出事件cancel
-->
<template>
  <div>
    <!-- 默认弹窗 普通 -->
    <el-dialog v-if="showType === 'add'" v-model="visible" :close-on-click-modal="true" :title="title" :width="width" @close="cancal">
      <el-form ref="ruleFormRef" class="form" :label-width="formLabelWidth" :model="form" :rules="formRules" :validate-on-rule-change="false">
        <template v-for="(item, index) in formItem" :key="index">
          <hs-select v-if="item.type === 'select'" v-model="form[item.prop]" :close-key="visible" :item="item" v-bind="$attrs" />
          <hs-input v-else v-model.trim="form[item.prop]" :item="item" v-bind="$attrs" />
        </template>
      </el-form>
      <slot name="custom"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button class="dialogCancelBtn" @click="cancal">{{ cancalText }}</el-button>
          <el-button type="primary" @click="confirmAdd">{{ confirmText }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 自定义弹窗 -->
    <el-dialog v-if="showType === 'custom'" v-model="visible" :close-on-click-modal="false" :destroy-on-close="true" :title="title" :width="width" @close="cancal">
      <slot name="custom">
        <div>{{ contentText }}</div>
      </slot>
      <slot name="bottoms"> </slot>
      <template #footer v-if="showBtn">
        <span class="dialog-footer">
          <el-button class="dialogCancelBtn" @click="cancal">{{ cancalText }}</el-button>
          <el-button type="primary" @click="confirmCustom">{{ confirmText }}</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 文本 -->
    <el-dialog v-if="showType === 'text'" v-model="visible" class="lawDialog" :close-on-click-modal="false" :title="title" :width="width" @close="cancal">
      <el-row class="lawMain" justify="space-between" type="flex">
        <div class="lawWrap wrapRight">
          <div id="lawContent" :style="{ height: tableHeight - 240 + 'px', padding: '10px' }">
            <el-scrollbar>
              <pre v-html="content"></pre>
            </el-scrollbar>
          </div>
        </div>
      </el-row>
    </el-dialog>
    <!-- 空白弹窗 -->
    <el-dialog v-if="showType === 'empty'" v-model="visible" class="emptyDialog" :close-on-click-modal="false" :title="title" :width="width" @close="emit('closeDialog')">
      <div class="emptyDialog-content" :style="{ height: height }">
        <slot name="content"></slot>
      </div>
    </el-dialog>
    <input v-show="false" ref="nullAppend" type="text" @focus="inputFocus" />
  </div>
</template>
<script setup>
import HsInput from '@/components/assembly/HsInput.vue'
import HsSelect from '@/components/assembly/HsSelect.vue'
const props = defineProps({
  showType: { type: String, default: 'add' },
  title: { type: String, default: '添加' },
  dialogFormVisible: { type: Boolean, default: true },
  formLabelWidth: { type: String, default: '100px' },
  form: { type: Object, default: () => {} },
  formRules: { type: Object, default: () => {} },
  formItem: { type: Object, default: () => {} },
  confirmText: { type: String, default: '确认' },
  cancalText: { type: String, default: '取消' },
  contentText: { type: String, default: '此操作将永久删除，是否继续？' },
  width: { type: String, default: '40%' },
  height: { type: String, default: '50vh' },
  content: { type: String, default: '默认' }, //文本内容
  showBtn: { type: Boolean, default: true } //自定义弹窗是否显示 底部按钮
})

// 是否可见
let visible = ref(props.dialogFormVisible)

// 弹窗表单
let form = ref(props.form)

// 向外 发送事件
const emit = defineEmits(['confirm', 'deleteTemplet', 'cancel', 'confirmCustom'])

// 表单的ref 用于验证
const ruleFormRef = ref(null)

// 添加框-点击确定 触发验证
const confirmAdd = () => {
  ruleFormRef.value.validate((valid) => {
    emit('confirm', valid, form)
  })
}

// 删除框-确认
// const confirmDelete = () => {
//   emit('deleteTemplet', true)
// }

// 自定义弹框-确认
const confirmCustom = () => {
  emit('confirmCustom')
}

// 下拉选择框未关闭 就关闭弹窗 会导致下拉框闪烁的问题
const nullAppend = ref(null)

// 关闭监听 支持发送到 上层组件中
const cancal = () => {
  nullAppend.value.click()
  // 关闭弹窗准备 预留100毫秒处理时间
  setTimeout(() => {
    // 清空表单
    visible.value = false
    if (props.form) ruleFormRef.value.resetFields()
    emit('cancel', visible.value)
  }, 100)
}

const inputFocus = () => {}

defineExpose({
  ruleFormRef
})
</script>
<style lang="scss" scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

// 纯文本
.lawMain {
  .addTitle {
    margin: 0;
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    background: #e4e6eb;
    opacity: 1;
  }
}
.lawWrap {
  width: 100%;
  border: 1px solid var(--el-text-color-primary);
}
.wrapRight {
  position: relative;
}
#lawContent {
  margin: 0;
  max-height: 55vh;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
  pre,
  p {
    margin: 0 2px;
    white-space: pre-line;
    word-wrap: break-word;
    word-break: break-all;
  }
  pre {
    height: 50vh;
  }
  .section {
    margin: 2px;
    padding: 10px;
    cursor: pointer;
    background: #eee;
  }
  .section.select {
    background: #a9c5ef;
  }
}
:deep(.el-dialog__body) {
  border-radius: 0 0 10px 10px;
}
</style>
