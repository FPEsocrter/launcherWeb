<!-- 新建浏览器-配置预览 -->
<template>
  <div class="config-preview">
    <div class="config-preview-title">
      <span>概要</span>
      <div class="config-preview-btn">
        <fs-button :disabled="true">
          <icon-font icon="randIcon" />
          <span @click="handleClick">生成新指纹</span>
        </fs-button>
      </div>
    </div>
    <el-scrollbar>
      <div class="config-preview-row">
        <span class="config-preview-label">环境名称:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.name }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">userAgent:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.userAgent }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">时区:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.timeZone }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">webRTC:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.webRTC }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">地理位置:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.location }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">语言:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.language }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">分辨率:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.resolution }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">字体:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.font }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">canvas:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.canvas }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">webGL:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.webGL }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">gupGL:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.gupGL }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">web元数据:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.webGLDevice }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">AudioContext:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.audioContext }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">媒体设备:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.mediaEquipment }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">ClientRects:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.clientRects }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">SpeechVoices:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.speechVoices }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">cpu 内存:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.resourceInfo }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">Do Not Track:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.doNotTrack }}</span>
      </div>
      <div class="config-preview-row">
        <span class="config-preview-label">端口保护:</span>
        <span class="config-preview-val">{{ simpleBrowerInfo.openPort }}</span>
      </div>
      <div class="config-empty"></div>
    </el-scrollbar>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const simpleBrowerInfo = reactive({
  name: '',
  userAgent: '',
  timeZone: '',
  webRTC: '',
  location: '',
  language: '',
  resolution: '',
  font: '',
  canvas: '',
  webGL: '',
  gupGL: '',
  webGLDevice: '',
  audioContext: '',
  mediaEquipment: '',
  clientRects: '',
  speechVoices: '',
  resourceInfo: '',
  doNotTrack: '',
  openPort: ''
})
const emit = defineEmits(['newBrower'])
const handleClick = () => {
  emit('newBrower')
}

const typeFunc = (type, res) => {
  if (typeof res[type] == 'function') {
    return res[type]()
  } else {
    return res[type]
  }
}

const simpleTypeEnum = ['默认', '本机', '噪音']

const modelValueChange = (browserInfo) => {
  let environment = browserInfo.environment

  simpleBrowerInfo.name = environment.name
  simpleBrowerInfo.userAgent = environment.userAgent

  let fingerprint = browserInfo.fingerprint

  simpleBrowerInfo.timeZone = typeFunc(fingerprint.timeZone.type, ['默认', '本机', fingerprint.timeZone.timeZone, '基于ip'])

  simpleBrowerInfo.webRTC = typeFunc(fingerprint.webRTC, ['默认', '本机', '基于ip', '仅tcp代理'])

  simpleBrowerInfo.location = typeFunc(fingerprint.location.type, [
    '默认',
    '本机',
    '[访问] 经度: ${fingerprint.location.latitude} 纬度: ${fingerprint.location.longitude}',
    '[访问] 基于ip',
    '[允许] 经度: ${fingerprint.location.latitude} 纬度: ${fingerprint.location.longitude}',
    '[允许] 基于ip'
  ])

  simpleBrowerInfo.language = typeFunc(fingerprint.language.type, [
    '默认',
    '本机',
    () => {
      return fingerprint.language.languages.join(', ')
    },
    '基于ip'
  ])

  simpleBrowerInfo.resolution = typeFunc(fingerprint.resolution.type, ['默认', '本机', '${fingerprint.resolution.windowWidth} x ${fingerprint.resolution.windowHeight}'])

  simpleBrowerInfo.font = typeFunc(fingerprint.font.type, ['默认', '本机', '噪音', fingerprint.font.length])

  simpleBrowerInfo.canvas = typeFunc(fingerprint.canvas, simpleTypeEnum)

  simpleBrowerInfo.webGL = typeFunc(fingerprint.webGL, simpleTypeEnum)

  simpleBrowerInfo.gupGL = typeFunc(fingerprint.gupGL, simpleTypeEnum)

  simpleBrowerInfo.gupGL = typeFunc(fingerprint.gupGL, simpleTypeEnum)

  simpleBrowerInfo.webGLDevice = typeFunc(fingerprint.webGLDevice.type, ['默认', '本机', '${fingerprint.webGLDevice.vendors} ${fingerprint.webGLDevice.renderer}'])

  simpleBrowerInfo.audioContext = typeFunc(fingerprint.audioContext, simpleTypeEnum)

  simpleBrowerInfo.mediaEquipment = typeFunc(fingerprint.mediaEquipment.type, [
    '默认',
    '本机',
    '噪音[${fingerprint.mediaEquipment.microphone},${fingerprint.mediaEquipment.speaker},${fingerprint.mediaEquipment.videoCamera}]'
  ])

  simpleBrowerInfo.clientRects = typeFunc(fingerprint.clientRects, simpleTypeEnum)

  simpleBrowerInfo.speechVoices = typeFunc(fingerprint.speechVoices, ['默认', '本机', '噪音', '基于ip'])

  simpleBrowerInfo.resourceInfo = typeFunc(fingerprint.resourceInfo.type, ['默认', '本机', '噪音[${fingerprint.resourceInfo.cpu},${fingerprint.resourceInfo.memory}]'])

  simpleBrowerInfo.doNotTrack = typeFunc(fingerprint.doNotTrack, simpleTypeEnum)

  simpleBrowerInfo.openPort = typeFunc(fingerprint.openPort.type, ['默认', '本机', fingerprint.openPort.list.join(',')])
}
modelValueChange(props.modelValue)

watch(() => props.modelValue, modelValueChange, { deep: true })
</script>
