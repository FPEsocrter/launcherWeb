<!-- 修改代理 弹窗 -->
<template>
  <el-dialog v-model="isShow" :close-on-click-modal="true" :title="'修改代理'" :width="'600px'" @close="cancal">
    <div class="config-form">
      <el-form ref="formRef" class="form" :label-width="100" :model="form" :validate-on-rule-change="false">
        <template v-for="(item, index) in definition" :key="index">
          <hs-input v-if="item.type === 'input' || item.type === 'textarea'" v-model.trim="form[item.prop]" :item="item" />
        </template>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmFix">确定</el-button>
        <el-button class="dialogCancelBtn" @click="cancal">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { PutAgentApi } from '@/service/admin/browser'

const props = defineProps({
  modelValue: { type: Boolean, default: true }, //是否显示弹窗
  row: { type: Object, default: () => {} } //当前点击的行
})

const emit = defineEmits(['update:modelValue'])

// 是否显示弹窗
const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const form = ref({
  name: null,
  userAgent: null,
  cookie: null,
  meno: null
})

// 定义表单
const definition = ref([
  { tit: '名称', prop: 'name', type: 'input' },
  { tit: 'UserAgent', prop: 'userAgent', type: 'input', options: [] },
  { tit: 'Cookie', prop: 'cookie', type: 'textarea', options: [] },
  { tit: '备注', prop: 'meno', type: 'textarea', options: [] }
])

// 查询
const getDetail = (id) => {
  PutAgentApi({ id: id }).then((res) => {
    console.log(res)
  })
}

// 提交修改
const confirmFix = () => {
  console.log(form.value)
  isShow.value = false
}

// 取消
const cancal = () => {
  isShow.value = false
}

// 监听是否回填(编辑)
watch(
  () => isShow.value,
  (newValue) => {
    if (newValue) {
      getDetail(props.row.id)
    }
  }
)
</script>

<style lang="scss" scoped>
.config-form {
  width: 85%;
  margin: 0 auto;
}
</style>
