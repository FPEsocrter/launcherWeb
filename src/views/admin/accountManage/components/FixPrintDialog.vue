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
import { PutPrintApi } from '@/service/admin/browser'

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
  time: null,
  webRTC: null,
  location: null,
  language: null,
  resolution: null,
  font: null,
  canvas: null,
  webGL: null,
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

// 查询
const getDetail = (id) => {
  PutPrintApi({ id: id }).then((res) => {
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
  height: 360px;
}
</style>
