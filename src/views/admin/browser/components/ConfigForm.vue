<!-- 新建浏览器-表单部分 -->
<template>
  <div class="config-content">
    <el-scrollbar>
      <el-form ref="formRef" class="form" :label-width="150" :model="form" :validate-on-rule-change="false">
        <div class="config-form">
          <template v-for="(item, index) in definition" :key="index">
            <hs-input v-if="item.type === 'input' || item.type === 'textarea'" v-model.trim="form[item.prop]" :item="item" />
          </template>
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="代理配置" name="1">
            <div class="config-form">
              <template v-for="(item, index) in definitionAgent" :key="index">
                <hs-input v-if="item.type === 'input' || item.type === 'textarea'" v-model.trim="form[item.prop]" :item="item" />
                <hs-select v-else-if="item.type === 'select'" v-model="form[item.prop]" :close-key="visible" :item="item" />
              </template>
            </div>
          </el-collapse-item>
          <el-collapse-item title="高级" name="2">
            <div class="config-form">
              <template v-for="(item, index) in definitionSenior" :key="index">
                <zl-cascade v-model.trim="form[item.prop]" :label-width="138" :item="item" />
              </template>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <div class="config-empty"></div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import mitt from '@/utils/mitt.js'
import { identicalAssignment } from '@/utils/common'

const props = defineProps({
  formDetail: { type: Object, default: () => {} } //编辑-详情
})

const form = ref({
  name: null,
  userAgent: null,
  cookie: null,
  meno: null,
  agentType: null,
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

// 定义表单
const definition = ref([
  { tit: '名称', prop: 'name', type: 'input' },
  { tit: 'UserAgent', prop: 'userAgent', type: 'input', options: [] },
  { tit: 'Cookie', prop: 'cookie', type: 'textarea', options: [] },
  { tit: '备注', prop: 'meno', type: 'textarea', options: [] }
])

// 代理
const definitionAgent = ref([
  { tit: '代理类型', prop: 'agentType', type: 'select', options: [] },
  { tit: '主机:端口', prop: 'port', type: 'select', options: [] },
  { tit: '代理账号', prop: 'account', type: 'input', options: [] },
  { tit: '代理密码', prop: 'password', type: 'input', options: [] }
])

// 高级
const definitionSenior = ref([
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

// 折叠面板key
const activeNames = ref(null)

// 监听浏览器表单
watch(
  form.value,
  (newVal) => {
    // 通知 更新概要组件
    mitt.emit('formChange', newVal)
  },
  { immediate: true },
  { deep: true }
)

// 监听是否回填(编辑)
watch(
  () => props.formDetail,
  (newValue) => {
    if (newValue) {
      // 合并、回填 表单
      identicalAssignment(form.value, newValue)
    }
  }
)

defineExpose({
  form
})
</script>

<style lang="scss" scoped>
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
</style>
