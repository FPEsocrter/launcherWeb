<template>
  <div>
    <div class="proxy-type">
      <el-form-item :label="'代理类型'">
        <div class="proxy-type-css">
          <el-select-f v-model="webProxy.type" :items="webProxyType" :placeholder="'请选择'" />
          <el-button-f @click="handleCheck"> 检查网络 </el-button-f>
        </div>
      </el-form-item>
    </div>

    <template v-if="webProxy.type != webProxyType.NO_PROXY">
      <div class="proxy-host-port">
        <el-form-item :label="'主机:端口'" :required="verif.host || verif.port">
          <el-input v-model.trim="webProxy.host" :placeholder="'请输入主机地址'">
            <template #append>
              :
              <el-input v-model.trim="webProxy.port" :placeholder="'端口'" />
            </template>
          </el-input>
        </el-form-item>
      </div>

      <div class="proxy-account">
        <el-form-item :label="'代理账号'">
          <el-input v-model.trim="webProxy.account" :placeholder="'请输入代理账号'" />
        </el-form-item>
      </div>
      <div class="proxy-password">
        <el-form-item :label="'代理密码'">
          <el-input v-model.trim="webProxy.password" :placeholder="'请输入代理密码'" :show-password="true" />
        </el-form-item>
      </div>
    </template>
    <div class="config-check-text" v-if="ipInfo.showIp">
      <p v-if="ipInfo?.ips.length">IP：{{ ipInfo?.ips.join(',') }}</p>
      <p v-if="ipInfo?.countryCode">国家/地区：{{ ipInfo.countryCode }}</p>
      <p v-if="ipInfo?.region">州/省：{{ ipInfo.region }}</p>
      <p v-if="ipInfo?.city">城市：{{ ipInfo.city }}</p>
    </div>
  </div>
</template>
<script setup>
import { webProxyType } from '@/domain/enum/webProxyType'
import { CheckNetWordkApi } from '@/service/admin/browser'
import { openMessageBox } from '@/utils/common'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { type: webProxyType.NO_PROXY }
      /**
       *  webProxy: {
          type: 0,
          showIp: '',
          host: '',
          port: '',
          account: '',
          password: '',
          other: {}
        }
       */
    }
  }
})
const webProxy = reactive(props.modelValue) //reactive
const verif = reactive({ host: false, port: false })
const ipInfo = reactive({ showIp: false, ips: [], countryCode: '', region: null, city: '' })

const handleCheck = () => {
  if (verifMsg.value.length > 0) {
    switch (webProxy.type) {
      case 1:
      case 2:
      case 3:
      case 4:
        {
          openMessageBox(verifMsg.value.join(','), 'error')
        }
        return
    }
  }

  CheckNetWordkApi(webProxy)
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      ipInfo.showIp = true
      ipInfo.ips = res.data.ips
      ipInfo.countryCode = res.data.countryCode
      ipInfo.region = res.data.region
      ipInfo.city = res.data.city
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}
let verifMsg = ref([])

watch(
  () => webProxy,
  (newValue) => {
    ipInfo.showIp = false
    verifMsg.value = []
    switch (newValue.type) {
      case 1:
      case 2:
      case 3:
      case 4: {
        verif.host = webProxy.host.trim() == ''
        if (verif.host) {
          verifMsg.value.push('主机不能空')
        }
        webProxy.port = convertToEmptyString(webProxy.port)
        verif.port = '' == webProxy.port
        if (verif.port) {
          verifMsg.value.push('端口不能空')
        }
        break
      }
      default: {
        break
      }
    }
  },
  { deep: true }
)
const convertToEmptyString = (value) => {
  if (typeof value == 'string' && value.trim() == '') {
    return ''
  }
  value = Number(value)
  if (!isNaN(value) && typeof value == 'number' && value > 0) {
    return Number(value)
  }
  return ''
}

defineExpose({
  webProxy,
  verifMsg
})
/**
 * 传入的是modelValue 是 代理的对象(ref过的对象)
 * const webProxy = reactive(props.modelValue)
 * webProxy== props.modelValue true
 * 外部的对象和内部对象是同一个对象
 * 外部修改  直接影响到内部的对象， 内部修改了， 直接影响到外部的对象
 */
</script>
<style lang="scss" scoped>
.proxy-type-css {
  display: flex;
  width: 100%;
  .el-select {
    margin-right: 10px;
  }
}

.config-check-text {
  padding-left: 120px;
  color: rgb(124, 201, 10);
  p {
    height: 18px;
  }
}

:deep(.proxy-host-port) {
  // 端口
  .el-input__wrapper {
    box-shadow: none;
  }
  .el-input-group__append {
    padding: 0;
    box-shadow: none;
    background-color: transparent;
  }
  .el-form-item__content {
    border: 1px solid #dadce2;
    border-radius: 3px;
  }
}

:deep(.el-form-item__label) {
  width: 120px !important;
}
</style>
