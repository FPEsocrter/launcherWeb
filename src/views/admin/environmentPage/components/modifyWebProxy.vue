<!-- 修改代理 弹窗 -->
<template>
  <el-dialog v-model="webproxyDig.dialog" :close-on-click-modal="true" :title="'修改代理'" :width="'600px'" @close="webproxyDig.dialog = false">
    <div class="config-form">
      <el-form>
        <web-proxy v-model="webProxyinfo" ref="refWebProxy" />
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button-f type="primary" @click="hadnleFix(), (webproxyDig.dialog = false)">确定</el-button-f>
        <el-button-f class="dialogCancelBtn" @click="webproxyDig.dialog = false">取消</el-button-f>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import WebProxy from '@/views/admin/browser/components/WebProxy.vue'
import { GetBrowserApi, FixBrowserApi } from '@/service/admin/browser'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { id: 0, dialog: true } //使用reactive({ id: 0, dialog: true }) 传入
    }
  }
})
const refWebProxy = ref('refWebProxy')
const emit = defineEmits(['submit'])
const webproxyDig = reactive(props.modelValue)
const webProxyinfo = reactive({
  type: 0,
  showIp: '',
  host: '',
  port: '',
  account: '',
  password: '',
  other: {}
})
const getBrowserInfo = () => {
  GetBrowserApi({ id: webproxyDig.id, webProxy: true }).then((res) => {
    Object.keys(webProxyinfo).forEach((key) => {
      webProxyinfo[key] = res.data.webProxy[key]
    })
  })
}
watch(() => webproxyDig.dialog, getBrowserInfo)

const hadnleFix = () => {
  console.log(...refWebProxy.value.verifMsg)
  FixBrowserApi({ id: webproxyDig.id, webProxy: webProxyinfo }).then(() => {
    emit('submit')
  })
}
</script>
<style lang="scss" scoped>
.config-form {
  width: 85%;
  margin: 0 auto;
}
</style>
