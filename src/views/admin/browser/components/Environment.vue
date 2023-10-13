<template>
  <div>
    <div class="environment-name">
      <el-form-item :label="'环境名称'" :required="verif.name">
        <el-input v-model.trim="environment.name" :placeholder="'请输入环境名称'" />
      </el-form-item>
    </div>
    <div class="environment-userAgent">
      <el-form-item :label="'UserAgent'" :required="verif.userAgent">
        <div class="user-agrent-css">
          <el-select-f v-model="checkItems" multiple collapse-tags collapse-tags-tooltip max-collapse-tags="2" :items="items" />
          <el-input v-model.trim="environment.userAgent">
            <template #append>
              <el-button-f @click="handleClick">
                <icon-font icon="icon-tihuancon" />
              </el-button-f>
            </template>
          </el-input>
        </div>
      </el-form-item>
    </div>
    <div class="environment-remark">
      <el-form-item :label="'备注'">
        <el-input v-model="environment.remark" type="textarea" />
      </el-form-item>
    </div>

    <div class="environment-cookie">
      <el-form-item :label="'Cookie'">
        <el-input type="textarea" disabled />
      </el-form-item>
    </div>
  </div>
</template>
<script setup>
import { UaMajorVersionApi, UaByVersionApi } from '@/service/admin/browser'
import { Integer } from '@/domain/constant/baseType'
import { openMessageBox } from '@/utils/common'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const checkItems = ref([])
const items = ref([])
const environment = reactive(props.modelValue) //reactive

UaMajorVersionApi()
  .then((res) => {
    if (res.statusCode != 200) {
      return
    }
    res.data.forEach((elt) => {
      items.value.push(elt)
    })
    for (let i = 0; i < 3; i++) {
      checkItems.value.push(res.data[i])
    }
  })
  .catch((error) => {
    openMessageBox(error, 'error')
  })

UaByVersionApi({ uaVersion: [Integer.MAX_VALUE] })
  .then((res) => {
    if (res.statusCode != 200) {
      return
    }
    environment.userAgent = res.data
  })
  .catch((error) => {
    openMessageBox(error, 'error')
  })

const handleClick = () => {
  UaByVersionApi({ uaVersion: checkItems.value })
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      environment.userAgent = res.data
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

const verif = reactive({ name: false, userAgent: false })
let verifMsg = ref([])
watch(
  () => environment,
  (newValue) => {
    verifMsg.value = []
    verif.name = newValue.name.trim() == ''
    if (verif.name) {
      verifMsg.value.push('环境名称不能为空')
    }
    verif.userAgent = newValue.userAgent.trim() == ''
    if (verif.userAgent) {
      verifMsg.value.push('userAgent不能为空')
    }
  },
  { deep: true }
)

defineExpose({
  environment,
  verifMsg
})
</script>
<style lang="scss" scoped>
.el-form-item__label {
  display: inline-block;
  text-align: center;
  width: 1em; /* 调整宽度以适应您的需求 */
}
.aligned-input {
  width: 100%; /* 设置输入框宽度为100%以充满el-form-item */
}

.user-agrent-css {
  display: flex;
  width: 100%;
  .el-select {
    margin-right: 10px;
  }
}
:deep(.el-form-item__label) {
  width: 120px !important;
}
</style>
