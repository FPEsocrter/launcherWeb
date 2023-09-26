<!-- 新建浏览器-配置预览 -->
<template>
  <div class="config-preview">
    <div class="config-preview-title">
      <span>概要</span>
      <!-- <div class="config-preview-btn">
        <icon-font icon="iconfont icon-icon1" />
        <span @click="handleClick">生成新指纹</span>
      </div> -->
    </div>
    <el-scrollbar>
      <div class="config-preview-row" v-for="(item, index) in definition" :key="index">
        <span class="config-preview-label">{{ item.tit }}:</span>
        <span class="config-preview-val" v-if="item.type === 'cascade'">{{ item.options[form[item.prop]] }}</span>
        <span class="config-preview-val" v-else-if="item.type === 'select'">{{ checkLabal(proxyList, form[item.prop]) }}</span>
        <span class="config-preview-val" v-else>{{ form[item.prop] }}</span>
      </div>
      <div class="config-empty"></div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import mitt from '@/utils/mitt.js'
import { proxyList } from '@/utils/format'

// import { GetRandomApi } from '@/service/admin/browser'

const props = defineProps({
  formDetail: { type: Object, default: () => {} } //编辑-详情
})

const form = ref({
  name: null,
  userAgent: null,
  // cookie: null,
  meno: null,
  agentType: null,
  host: null,
  port: null,
  account: null,
  password: null,
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

// 根据code 放回label名
const checkLabal = (arr, val) => {
  let find = arr.find((item) => item.value == val)
  return find ? find.key : ''
}

// 定义表单
const definition = ref([
  { tit: '名称', prop: 'name', type: 'input' },
  { tit: 'UserAgent', prop: 'userAgent', type: 'input', options: [] },
  // { tit: 'Cookie', prop: 'cookie', type: 'textarea', options: [] },
  { tit: '备注', prop: 'meno', type: 'textarea', options: [] },
  { tit: '代理类型', prop: 'agentType', type: 'select', options: proxyList },
  { tit: '主机', prop: 'host', type: 'input', options: [] },
  { tit: '端口', prop: 'port', type: 'input', options: [] },
  { tit: '代理账号', prop: 'account', type: 'input', options: [] },
  // { tit: '代理密码', prop: 'password', type: 'input', options: [] },
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

// // 生成新指纹
// const handleClick = () => {
//   form.value.name = '随机001'
//   GetRandomApi().then((res) => {
//     console.log(res)
//   })
// }

// 监听表单变化 实时更新
mitt.on('formChange', (data) => {
  form.value = data
})

// 防止mitt事件被重复触发
onBeforeUnmount(() => {
  mitt.all.delete('formChange')
})

// 监听是否回填(编辑)
watch(
  () => props.formDetail,
  (newValue) => {
    if (newValue) {
      console.log(newValue)
      // 合并、回填 表单
      // identicalAssignment(form.value, newValue)
    }
  }
)
</script>

<style lang="scss" scoped>
.config-preview {
  height: 100%;
}
.config-preview-title {
  position: relative;
  margin-bottom: 15px;
  .config-preview-btn {
    top: 0;
    right: 0;
    padding: 5px 8px;
    border: 1px solid #409eff;
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
</style>
