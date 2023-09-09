<!-- 新建浏览器 -->
<template>
  <div class="browser-content">
    <div class="browser-title">导入配置</div>
    <div class="browser-config">
      <config-form ref="formRef" :formDetail="formDetail" />
    </div>
    <div class="browser-bottom">
      <hs-button :item="definitionBtn[0]" @click-btn="handleSubmit" />
      <hs-button :item="definitionBtn[1]" @click-btn="handleCancel" />
    </div>
    <div class="browser-right">
      <config-preview :formDetail="formDetail" />
    </div>
  </div>
</template>
<script setup>
import HsButton from '@/components/assembly/HsButton.vue'
import ConfigForm from './components/ConfigForm.vue'
import ConfigPreview from './components/ConfigPreview.vue'
import { useRouter, useRoute } from 'vue-router'
import { AddBrowserApi, GetBrowserApi } from '@/service/admin/browser'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)

// 按钮定义
const definitionBtn = [{ text: '确定', type: 'primary' }, { text: '取消' }]

// 提交配置表单
const handleSubmit = () => {
  console.log('表单值：')
  console.log(formRef.value.form)
  AddBrowserApi(formRef.value.form).then(({ data: res }) => {
    console.log(res)
  })
}

// 返回上一级
const handleCancel = () => {
  router.go(-1)
}

// 表单详情
const formDetail = ref({})

// 获取详情->回填表单以及概要
const getDetail = (id) => {
  // 假数据
  formDetail.value = {
    cookie: '这是cookie',
    memo: '这是备注'
  }
  GetBrowserApi({ id: id }).then((res) => {
    console.log(res)
  })
}

onMounted(() => {
  // 是否为 编辑
  if (route.query.id) {
    getDetail(route.query.id)
  }
})
</script>

<style lang="scss" scoped>
.browser-content {
  position: relative;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: white;
  .browser-title {
    border-bottom: 1px solid #e0dfdf;
    padding-bottom: 10px;
  }
  .browser-config {
    margin-top: 18px;
    height: calc(100% - 48px);
  }
  // 固定
  .browser-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    line-height: 60px;
    width: 100%;
    padding: 0px 160px;
    box-sizing: border-box;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    .btn-content {
      margin-right: 20px;
    }
  }
  .browser-right {
    position: absolute;
    right: 10px;
    top: 55px;
    background: rgba(#e5e8ef, 0.4);
    padding: 10px;
    box-sizing: border-box;
    height: 78%;
    width: 240px;
    border-radius: 8px;
  }
}
</style>
