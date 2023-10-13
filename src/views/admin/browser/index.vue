<template>
  <div class="browser-content">
    <div class="browser-title">导入配置</div>
    <div class="config-content">
      <el-scrollbar>
        <el-form class="form">
          <el-collapse model-value="1">
            <el-collapse-item title="环境信息" name="1">
              <div class="config-form">
                <environment v-model="val.environment" ref="refEnvironment" />
              </div>
            </el-collapse-item>
            <el-collapse-item title="代理配置" name="2">
              <div class="config-form">
                <web-proxy v-model="val.webProxy" ref="refWebProxy" />
              </div>
            </el-collapse-item>
            <el-collapse-item title="高级" name="3">
              <div class="config-form">
                <fingerprint v-model="val.fingerprint" ref="refFingerprint" />
              </div>
            </el-collapse-item>
            <div class="config-empty"></div>
          </el-collapse>
        </el-form>
      </el-scrollbar>
    </div>
    <div id=""></div>
    <div class="browser-bottom">
      <div>
        <el-button-f @click="id == null ? handleDefine() : handFix()">确定</el-button-f>
        <el-button-f @click="handleCancel">取消</el-button-f>
      </div>
    </div>
    <div class="browser-right">
      <browser-synopsis v-model="val" />
    </div>
  </div>
</template>
<script setup>
import Environment from './components/Environment.vue'
import WebProxy from './components/WebProxy.vue'
import Fingerprint from './components/Fingerprint.vue'
import BrowserSynopsis from './components/BrowserSynopsis.vue'
import { useRouter, useRoute } from 'vue-router'
import { AddBrowserApi, GetBrowserApi, FixBrowserApi } from '@/service/admin/browser'
import { openMessageBox } from '@/utils/common'

const route = useRoute()
const id = ref(route.query.id)
const refEnvironment = ref('refEnvironment')
const refWebProxy = ref('refWebProxy')
const refFingerprint = ref('refFingerprint')
const router = useRouter()
const randName = () => {
  const date = new Date()
  const year = date.getFullYear() % 100
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  let random = Math.floor(Math.random() * 100)
  random = (random < 10 ? '0' : '') + random
  return `env${year}${month}${day}${hours}${minutes}${seconds}${random}`
}

const handleCancel = () => {
  router.go(-1)
}
const verifMsg = () => {
  const verifMsg = [...refEnvironment.value.verifMsg, ...refWebProxy.value.verifMsg, ...refFingerprint.value.verifMsg]
  //todo 验证
  verifMsg
}

const handleDefine = () => {
  verifMsg()
  AddBrowserApi(val)
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      router.go(-1)
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

const handFix = () => {
  verifMsg()
  FixBrowserApi({ id: id.value, ...val })
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      router.go(-1)
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

const val = reactive({
  environment: {
    name: '',
    remark: '',
    userAgent: '',
    cookie: []
  },
  webProxy: {
    type: 0,
    showIp: '',
    host: '',
    port: '',
    account: '',
    password: '',
    other: {}
  },
  fingerprint: {
    timeZone: { type: 0, timeZone: '' },
    webRTC: 0,
    location: { type: 0, latitude: 0, longitude: 0, accuracy: 0 },
    language: { type: 0, languages: [] },
    resolution: { type: 0, windowWidth: 0, windowHeight: 0 },
    font: { type: 0, fontList: [] },
    canvas: 0,
    webGL: 0,
    gupGL: 0,
    webGLDevice: { type: 0, vendors: '', renderer: '' },
    audioContext: 0,
    mediaEquipment: { type: 0, microphone: 1, speaker: 1, videoCamera: 0 },
    clientRects: 0,
    speechVoices: 0,
    resourceInfo: { type: 0, cpu: 16, memory: 8 },
    doNotTrack: 0,
    openPort: { type: 0, list: [] }
  }
})

if (id.value == null) {
  val.environment.name = randName()
} else if (id.value > 0) {
  GetBrowserApi({ id: id.value })
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      Object.keys(val.environment).forEach((key) => {
        val.environment[key] = res.data.environment[key]
      })

      Object.keys(val.webProxy).forEach((key) => {
        val.webProxy[key] = res.data.webProxy[key]
      })

      Object.keys(val.fingerprint).forEach((key) => {
        val.fingerprint[key] = res.data.fingerprint[key]
      })
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

defineExpose({
  val
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
    bottom: -22px;
    left: 0;
    z-index: 99;
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

.config-content {
  width: calc(100% - 250px);
  height: 100%;
  .el-form {
    margin: 0 20px 0 0;
  }
  .config-form {
    width: 70%;
  }
  .config-empty {
    height: 60px;
  }
}

.el-collapse div:nth-child(1) {
  margin-top: 20px;
}
</style>
