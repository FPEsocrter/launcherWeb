<!-- 修改代理 弹窗 -->
<template>
  <el-dialog v-model="fingerprintDig.dialog" :close-on-click-modal="true" :title="'修改指纹'" :width="'600px'" @close="fingerprintDig.dialog = false">
    <div class="config-form">
      <el-scrollbar>
        <fingerprint v-model="fingerprintInfo" ref="reffingerprint" />
      </el-scrollbar>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button-f type="primary" @click="hadnleFix(), (fingerprintDig.dialog = false)">确定</el-button-f>
        <el-button-f class="dialogCancelBtn" @click="fingerprintDig.dialog = false">取消</el-button-f>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import Fingerprint from '@/views/admin/browser/components/Fingerprint.vue'
import { GetBrowserApi, FixBrowserApi } from '@/service/admin/browser'
import { openMessageBox } from '@/utils/common'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { id: 0, dialog: true } //使用reactive({ id: 0, dialog: true }) 传入
    }
  }
})

const reffingerprint = ref('reffingerprint')
const emit = defineEmits(['submit'])
const fingerprintDig = reactive(props.modelValue)
const fingerprintInfo = reactive({
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
})
const getBrowserInfo = () => {
  GetBrowserApi({ id: fingerprintDig.id, fingerprint: true })
    .then((res) => {
      Object.keys(fingerprintInfo).forEach((key) => {
        fingerprintInfo[key] = res.data.fingerprint[key]
      })
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}
watch(() => fingerprintDig.dialog, getBrowserInfo)

const hadnleFix = () => {
  console.log(...reffingerprint.value.verifMsg)
  FixBrowserApi({ id: fingerprintDig.id, fingerprint: fingerprintInfo })
    .then(() => {
      emit('submit')
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}
</script>
<style lang="scss" scoped>
.config-form {
  width: 85%;
  margin: 0 auto;
  height: 360px;
}
</style>
