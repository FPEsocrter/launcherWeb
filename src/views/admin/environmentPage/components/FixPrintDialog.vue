<!-- 修改指纹 弹窗 -->
<template>
  <el-dialog v-model="isShow" :close-on-click-modal="true" :title="'修改指纹'" :width="'600px'" @close="cancal">
    <div class="config-form">
      <el-scrollbar>
        <el-form ref="formRef" class="form" :label-width="100" :model="form" :validate-on-rule-change="false">
          <template v-for="(item, index) in definition" :key="index">
            <zl-cascade v-model.trim="form[item.prop]" :label-width="110" :item="item" />
          </template>
        </el-form>
      </el-scrollbar>
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
import { GetPrintApi, FixBrowserApi } from '@/service/admin/browser'
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
  userAgent: null,
  time: null,
  webRTC: null,
  location: null,
  language: null,
  resolution: null,
  font: null,
  canvas: null,
  webGL: null,
  gupGL: null,
  metadata: null,
  audioContext: null,
  media: null,
  clientRects: null,
  speechVoices: null,
  track: null,
  protect: null
})

// 高级
const definition = ref([
  { tit: '时区', prop: 'time', type: 'cascade', options: ['默认', '关闭'] },
  { tit: 'webRTC', prop: 'webRTC', type: 'cascade', options: ['默认', '关闭'] },
  { tit: '地理位置', prop: 'location', type: 'cascade', options: ['默认', '禁止'] },
  { tit: '语言', prop: 'language', type: 'cascade', options: ['默认'] },
  { tit: '分辨率', prop: 'resolution', type: 'cascade', options: ['默认', '随机'] },
  { tit: '字体', prop: 'font', type: 'cascade', options: ['默认'] },
  { tit: 'canvas', prop: 'canvas', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: 'webGL', prop: 'webGL', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: 'web元数据', prop: 'metadata', type: 'cascade', options: ['默认', '关闭'] },
  { tit: 'AudioContext', prop: 'audioContext', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: '媒体设备', prop: 'media', type: 'cascade', options: ['默认', '智能', '关闭'] },
  { tit: 'ClientRects', prop: 'clientRects', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: 'SpeechVoices', prop: 'speechVoices', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: 'Do Not Track', prop: 'track', type: 'cascade', options: ['默认', '开启', '关闭'] },
  { tit: '端口保护', prop: 'protect', type: 'cascade', options: ['关闭'] }
])

// 查询到的指纹详情
const detail = ref(null)

// 查询
const getDetail = (id) => {
  GetPrintApi({ id: id }).then((res) => {
    if (res.statusCode == 200) {
      detail.value = res.data
      form.value.userAgent = res.data?.fingerprint?.userAgent
      form.value.time = res.data?.fingerprint?.timeZone?.type
      form.value.webRTC = res.data?.fingerprint?.webRTC
      form.value.location = res.data?.fingerprint?.location?.type
      form.value.language = res.data?.fingerprint?.language?.type
      form.value.resolution = res.data?.fingerprint?.resolution?.type
      form.value.font = res.data?.fingerprint?.font?.type
      form.value.canvas = res.data?.fingerprint?.canvas
      form.value.webGL = res.data?.fingerprint?.webGL
      form.value.gupGL = res.data?.fingerprint?.gupGL
      form.value.metadata = res.data?.fingerprint?.webGLDevice?.type
      form.value.audioContext = res.data?.fingerprint?.audioContext
      form.value.media = res.data?.fingerprint?.mediaEquipment?.type
      form.value.clientRects = res.data?.fingerprint?.clientRects
      form.value.speechVoices = res.data?.fingerprint?.speechVoices
      form.value.resourceInfo = res.data?.fingerprint?.resourceInfo?.type
      form.value.track = res.data?.fingerprint?.doNotTrack
      form.value.protect = res.data?.fingerprint?.openPort?.type
    }
  })
}

// 提交修改
const confirmFix = () => {
  let postForm = {
    fingerprint: {
      userAgent: form.value.userAgent,
      timeZone: {
        type: form.value.time,
        timeZone: ''
      },
      webRTC: form.value.webRTC,
      location: {
        type: form.value.location,
        latitude: 0,
        longitude: 0,
        accuracy: 0
      },
      language: {
        type: form.value.language
        // languages: []
      },
      resolution: {
        type: form.value.resolution
        // windowWidth: 0,
        // windowHeight: 0
      },
      font: {
        type: form.value.font
        // fontList: []
      },
      canvas: form.value.canvas,
      webGL: form.value.webGL,
      gupGL: form.value.gupGL,
      webGLDevice: {
        type: form.value.webGL
        // vendors: '',
        // renderer: ''
      },
      audioContext: form.value.audioContext,
      mediaEquipment: {
        type: form.value.media
        // microphone: 0,
        // speaker: 0,
        // videoCamera: 0
      },
      clientRects: form.value.clientRects,
      speechVoices: form.value.speechVoices,
      resourceInfo: {
        type: form.value.resourceInfo
        // cpu: 0,
        // memory: 0
      },
      doNotTrack: form.value.track,
      openPort: {
        type: form.value.protect
        // list: []
      }
    }
  }

  postForm['id'] = Number(detail.value?.id)

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
  height: 360px;
}
</style>
