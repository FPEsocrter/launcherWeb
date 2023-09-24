<!-- 新建浏览器-表单部分 -->
<template>
  <div class="config-content">
    <el-scrollbar>
      <el-form ref="formRefs" :rules="formRules" class="form" :label-width="150" :model="form" :validate-on-rule-change="false">
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
// import { identicalAssignment } from '@/utils/common'
import { proxyList } from '@/utils/format'
import { onMounted } from 'vue'
const props = defineProps({
  formDetail: { type: Object, default: () => {} }, //编辑-详情
  isEdit: null
})

const formRefs = ref(null)

const formRules = ref([])
const form = ref({
  name: null, //环境名称
  userAgent: null,
  cookie: null,
  meno: null, //环境备注
  agentType: null, //代理类型
  port: null, //端口
  account: null, //账号
  password: null, //密码
  time: 0, //时区
  webRTC: 0,
  location: 0, //地理位置
  language: 0, //语言
  resolution: 0, //分辨率
  font: 0, //字体
  canvas: 0,
  webGL: 0,
  metadata: 0, //元数据
  audioContext: 0, //
  media: 0, //媒体设备
  clientRects: 0,
  speechVoices: 0,
  resourceInfo: 0, //设备资源信息
  track: 0,
  protect: 0 //端口保护
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
  { tit: '代理类型', prop: 'agentType', type: 'select', options: proxyList },
  { tit: '主机:端口', prop: 'port', type: 'input', options: [] },
  { tit: '代理账号', prop: 'account', type: 'input', options: [] },
  { tit: '代理密码', prop: 'password', type: 'input', inputType: true, options: [] }
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
  { tit: 'gupGL', prop: 'gupGL', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: 'web元数据', prop: 'metadata', type: 'cascade', options: ['默认', '关闭'] },
  { tit: 'AudioContext', prop: 'audioContext', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: '媒体设备', prop: 'media', type: 'cascade', options: ['默认', '智能', '关闭'] },
  { tit: 'ClientRects', prop: 'clientRects', type: 'cascade', options: ['默认', '噪音', '关闭'] },
  { tit: '设备资源信息', prop: 'resourceInfo', type: 'cascade', options: ['默认', '本机'] },
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
  // [() => props.formDetail.environment, () => props.formDetail.webProxy, () => props.formDetail.fingerprint, () => props.formDetail.chromiumData],
  (newVal) => {
    // 是否编辑
    if (props.isEdit) {
      form.value = {
        name: newVal?.environment?.name,
        userAgent: newVal?.fingerprint?.userAgent,
        cookie: newVal?.chromiumData?.cookie,
        meno: newVal.environment?.remark,
        agentType: newVal?.webProxy?.type,
        port: newVal?.webProxy?.post,
        account: newVal?.webProxy?.account,
        password: newVal?.webProxy?.password,
        time: newVal?.fingerprint?.timeZone?.type,
        webRTC: newVal?.fingerprint?.webRTC,
        location: newVal?.fingerprint?.location?.type,
        language: newVal?.fingerprint?.language?.type,
        resolution: newVal?.fingerprint?.resolution?.type,
        font: newVal?.fingerprint?.resolution?.font,
        canvas: newVal?.fingerprint?.canvas,
        webGL: newVal?.fingerprint?.webGL,
        gupGL: newVal?.fingerprint?.gupGL,
        metadata: newVal?.fingerprint?.webGLDevice?.type,
        audioContext: newVal?.fingerprint?.audioContext,
        media: newVal?.fingerprint?.mediaEquipment?.type,
        clientRects: newVal?.fingerprint?.clientRects,
        speechVoices: newVal?.fingerprint?.speechVoices,
        resourceInfo: newVal?.fingerprint?.resourceInfo?.type,
        track: newVal?.fingerprint?.doNotTrack,
        protect: newVal?.fingerprint?.openPort?.type
      }
      // 获取查询的数据 回填-预览
      mitt.emit('formChange', form.value)
      // 合并、回填 表单
    }
  },
  { deep: true }
)

// 通知设置初始值
onMounted(() => {
  mitt.emit('formChange', form.value)
})

defineExpose({
  form,
  formRefs
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
