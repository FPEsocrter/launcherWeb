<template>
  <el-dialog v-model="isShow" :close-on-click-modal="true" :width="'600px'" @close="handleClose">
    <div class="config-form">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="评分" prop="rate">
          <el-rate v-model="form.rate" show-text :texts="['糟糕', '一般', '尚可', '满意', '非常满意']" />
        </el-form-item>
        <el-form-item label="意见反馈" prop="suggestion">
          <el-input v-model="form.suggestion" maxlength="500" :autosize="{ minRows: 5, maxRows: 5 }" placeholder="请填写您的意见反馈(比如需求建议等)" show-word-limit type="textarea" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model.number="form.phone" placeholder="选填" />
        </el-form-item>
        <el-form-item label="微信" prop="wechat">
          <el-input v-model="form.wechat" placeholder="选填" maxlength="30" />
        </el-form-item>
        <el-form-item label="Skype" prop="skype">
          <el-input v-model="form.skype" placeholder="选填" maxlength="30" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button-f type="primary" @click="hadnleSubmit()">确定</el-button-f>
        <el-button-f class="dialogCancelBtn" @click="handleClose">取消</el-button-f>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { AddFeedbackApi } from '@/service/admin/support'
import { openMessageBox } from '@/utils/common'

import { reactive } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

// 是否显示
const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const ruleFormRef = ref(null)

const form = reactive({
  rate: null,
  suggestion: null,
  phone: null,
  wechat: null,
  skype: null
})

const rules = {
  phone: [
    {
      pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  suggestion: [{ required: true, message: '请输入意见反馈' }]
}

const hadnleSubmit = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      AddFeedbackApi(form)
        .then((res) => {
          if (res.statusCode == 200) {
            openMessageBox('操作成功', 'succes')
            ruleFormRef.value.resetFields()
            ruleFormRef.value.clearValidate()
            handleClose()
          }
        })
        .catch((error) => {
          openMessageBox(error, 'error')
        })
    }
  })
}

const handleClose = () => {
  isShow.value = false
}
</script>
<style scoped lang="scss">
.config-form {
  width: 85%;
  margin: 0 auto;
}
:deep(.el-rate__text) {
  color: gray !important;
  font-size: 12px;
}
</style>
