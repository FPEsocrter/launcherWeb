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
import { GetAgentApi, FixBrowserApi } from '@/service/admin/browser'
import { openMessageBox } from '@/utils/common'

const props = defineProps({
  modelValue: { type: Boolean, default: true }, //是否显示弹窗
  row: { type: Object, default: () => {} } //当前点击的行
})

const formRef = ref(null)

const emit = defineEmits(['update:modelValue', 'update-list'])

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
  name: '',
  userAgent: '',
  // cookie: null,
  meno: ''
})

// 定义表单
const definition = ref([
  { tit: '名称', prop: 'name', type: 'input' },
  { tit: 'UserAgent', prop: 'userAgent', type: 'input', options: [] },
  // { tit: 'Cookie', prop: 'cookie', type: 'textarea', options: [] },
  { tit: '备注', prop: 'meno', type: 'textarea', options: [] }
])

// 查询到的指纹详情
const detail = ref(null)

// 查询
const getDetail = (id) => {
  GetAgentApi({ id: id }).then((res) => {
    if (res.statusCode == 200) {
      detail.value = res.data
      form.value.name = res.data?.environment?.name
      form.value.meno = res.data?.environment?.meno
      form.value.userAgent = res.data?.fingerprint?.userAgent
      // form.value.cookie = res.data?.chromiumData?.cookie
    }
  })
}

// 提交修改
const confirmFix = () => {
  let postForm = {
    environment: {
      name: form.value.name,
      remark: form.value.meno
    },
    fingerprint: detail.value?.fingerprint,
    chromiumData: {
      cookie: {}
    }
  }
  postForm['id'] = Number(detail.value?.id)
  postForm.fingerprint.userAgent = form.value.userAgent

  // 发起修改请求
  FixBrowserApi(postForm).then((res) => {
    if (res.statusCode == 200) {
      formRef.value.resetFields()
      openMessageBox('修改成功', 'success')
      isShow.value = false
      // 更新列表
      emit('update-list')
    } else {
      openMessageBox(res.message, 'error')
    }
  })
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
