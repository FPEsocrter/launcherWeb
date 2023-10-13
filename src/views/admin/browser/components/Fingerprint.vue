<template>
  <div class="cascade-btn">
    <el-form-item label="时区1">
      <fs-cascade v-model="fingerprint.timeZone.type" :items="{ 0: '默认', 1: '本机', 3: '基于ip' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="webRTC">
      <fs-cascade v-model="fingerprint.webRTC" :items="['默认', '本机', '基于ip', '仅tcp代理']" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="地理位置">
      <fs-cascade v-model="fingerprint.location.type" :items="{ 0: '默认', 1: '本机', 3: '[访问] 基于ip', 5: '[允许] 基于ip' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="语言">
      <fs-cascade v-model="fingerprint.language.type" :items="{ 0: '默认', 1: '本机', 3: '基于ip' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="分辨率">
      <fs-cascade v-model="fingerprint.resolution.type" :items="{ 0: '默认', 1: '本机' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="字体">
      <fs-cascade v-model="fingerprint.font.type" :items="{ 0: '默认', 1: '本机', 2: '噪音' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="canvas">
      <fs-cascade v-model="fingerprint.canvas" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="webGL">
      <fs-cascade v-model="fingerprint.webGL" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="gupGL">
      <fs-cascade v-model="fingerprint.gupGL" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="web元数据">
      <fs-cascade v-model="fingerprint.webGLDevice.type" :items="{ 0: '默认', 1: '本机' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="AudioContext">
      <fs-cascade v-model="fingerprint.audioContext" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="媒体设备">
      <fs-cascade v-model="fingerprint.mediaEquipment.type" :items="{ 0: '默认', 1: '本机' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="ClientRects">
      <fs-cascade v-model="fingerprint.clientRects" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="SpeechVoices">
      <fs-cascade v-model="fingerprint.speechVoices" :items="['默认', '本机', '噪音', '基于ip']" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="cpu 内存">
      <fs-cascade v-model="fingerprint.resourceInfo.type" :items="{ 0: '默认', 1: '本机' }" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="Do Not Track">
      <fs-cascade v-model="fingerprint.doNotTrack" :items="simpleTypeEnum" />
    </el-form-item>
  </div>
  <div class="cascade-btn">
    <el-form-item label="端口保护">
      <fs-cascade v-model="fingerprint.openPort.type" :items="{ 0: '默认', 1: '本机' }" />
    </el-form-item>
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
const fingerprint = reactive(props.modelValue)
const simpleTypeEnum = ['默认', '本机', '噪音']
let verifMsg = ref([])
watch(
  () => fingerprint,
  (newValue) => {
    verifMsg.value = []
    newValue
    //todo
    // verif.name = newValue.name.trim() == ''
    // if (verif.name) {
    //   verifMsg.push('环境名称不能为空')
    // }
    // verif.userAgent = newValue.userAgent.trim() == ''
    // if (verif.userAgent) {
    //   verifMsg.push('userAgent不能为空')
    // }
  },
  { deep: true }
)

defineExpose({
  fingerprint,
  verifMsg
})
</script>
<style lang="scss" scoped>
.config-preview {
  height: 100%;
}
.config-preview-title {
  position: relative;
  margin-bottom: 15px;
  height: 32px;
  line-height: 32px;
  .config-preview-btn {
    top: 0;
    right: 0;
    // padding: 5px 8px;
    // border: 1px solid #409eff;
    position: absolute;
    border-radius: 6px;
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
    span {
      margin-left: 5px;
    }
  }
}
.config-preview-row {
  font-size: 13px;
  margin-bottom: 10px;
  .config-preview-label {
    color: #a4a5a7;
    margin-right: 12px;
  }
}

:deep(.el-scrollbar__wrap) {
  height: 90% !important;
}

:deep(.el-form-item__label) {
  width: 120px !important;
}
</style>
