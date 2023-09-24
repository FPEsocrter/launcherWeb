<!-- 新建浏览器 -->
<template>
  <div class="browser-content">
    <div class="browser-title">导入配置</div>
    <div class="browser-config">
      <config-form ref="formRef" :formDetail="formDetail" :isEdit="route.query.id" />
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
import { AddBrowserApi, GetBrowserApi, FixBrowserApi } from '@/service/admin/browser'
import { openMessageBox } from '@/utils/common'

const router = useRouter()
const route = useRoute()

const formRef = ref(null)

// 按钮定义
const definitionBtn = [{ text: '确定', type: 'primary' }, { text: '取消' }]

// 提交配置表单
const handleSubmit = () => {
  const configForm = formRef.value.form
  let postForm = {
    environment: {
      name: configForm.name,
      remark: configForm.meno
    },
    webProxy: {
      type: configForm.agentType,
      host: configForm.port,
      port: 0,
      account: configForm.account,
      password: configForm.password,
      other: {}
    },
    fingerprint: {
      userAgent: configForm.userAgent,
      timeZone: {
        type: configForm.time,
        timeZone: ''
      },
      webRTC: configForm.webRTC,
      location: {
        type: configForm.location,
        latitude: 0,
        longitude: 0,
        accuracy: 0
      },
      language: {
        type: configForm.language
        // languages: []
      },
      resolution: {
        type: configForm.resolution
        // windowWidth: 0,
        // windowHeight: 0
      },
      font: {
        type: configForm.font
        // fontList: []
      },
      canvas: configForm.canvas,
      webGL: configForm.webGL,
      gupGL: configForm.gupGL,
      webGLDevice: {
        type: configForm.webGL
        // vendors: '',
        // renderer: ''
      },
      audioContext: configForm.audioContext,
      mediaEquipment: {
        type: configForm.media
        // microphone: 0,
        // speaker: 0,
        // videoCamera: 0
      },
      clientRects: configForm.clientRects,
      speechVoices: configForm.speechVoices,
      resourceInfo: {
        type: configForm.resourceInfo
        // cpu: 0,
        // memory: 0
      },
      doNotTrack: configForm.track,
      openPort: {
        type: configForm.protect
        // list: []
      }
    },
    chromiumData: {
      // cookie: configForm.cookie
      cookie: {}
    }
  }

  // 是否为 编辑
  if (route.query.id) {
    // 编辑
    postForm['id'] = Number(route.query.id)
    FixBrowserApi(postForm).then((res) => {
      if (res.statusCode == 200) {
        clearForm()
        openMessageBox('添加成功', 'success')
      } else {
        openMessageBox(res.message, 'error')
      }
    })
  } else {
    // 新增
    AddBrowserApi(postForm).then((res) => {
      if (res.statusCode == 200) {
        clearForm()
        openMessageBox('添加成功', 'success')
      } else {
        openMessageBox(res.message, 'error')
      }
    })
  }
}

// 清空表单
const clearForm = () => {
  formRef.value.formRefs.resetFields()
  formRef.value.form.time = 0
  formRef.value.form.webRTC = 0
  formRef.value.form.location = 0
  formRef.value.form.language = 0
  formRef.value.form.resolution = 0
  formRef.value.form.font = 0
  formRef.value.form.canvas = 0
  formRef.value.form.webGL = 0
  formRef.value.form.metadata = 0
  formRef.value.form.audioContext = 0
  formRef.value.form.media = 0
  formRef.value.form.clientRects = 0
  formRef.value.form.speechVoices = 0
  formRef.value.form.resourceInfo = 0
  formRef.value.form.track = 0
  formRef.value.form.protect = 0
}

// 返回上一级
const handleCancel = () => {
  router.go(-1)
}

// 表单详情
const formDetail = ref({})

// 获取详情->回填表单以及概要
const getDetail = (id) => {
  GetBrowserApi({ id: id }).then(({ data: res }) => {
    formDetail.value = res
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
