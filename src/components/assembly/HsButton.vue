<!--
  type:primary/success/info/warning/danger
  btnType：ordinary/upload(默认ordinary)
  text:显示内容 [string]
  plain：淡色 [boolean]
  circle:是由为小圆圈[携带icon] [boolean]
  disabled:是否禁用 [boolean]
  size：尺寸
-->
<template>
  <div class="btn-content">
    <el-upload v-if="it.btnType === 'upload'" ref="uploadRef" :accept="it.accept" action="#" :auto-upload="false" :on-change="handleUpload" :show-file-list="false">
      <el-tooltip :content="it.content" effect="dark" placement="bottom">
        <el-button :loading="it.loading ? true : false" :type="it.type ? it.type : ''">{{ it.text }}</el-button>
      </el-tooltip>
    </el-upload>
    <el-button
      v-else
      :size="it.size"
      :circle="it.circle ? true : false"
      :disabled="it.disabled ? true : false"
      :loading="it.loading ? true : false"
      :plain="it.plain ? true : false"
      :type="it.type ? it.type : ''"
      @click="handleClick"
    >
      <template v-if="it.icon"> <icon-font :icon="it.icon" /></template>
      <template v-else>
        <template v-if="it.content">
          <el-tooltip :content="it.content" effect="dark" placement="bottom">
            {{ it.text }}
          </el-tooltip>
        </template>
        <template v-else>
          {{ it.text }}
        </template>
      </template>
    </el-button>
  </div>
</template>
<script setup>
import { useThrottledRefHistory } from '@vueuse/core' //防抖
import { openMessageBox } from '@/utils/common'

const props = defineProps({
  item: { type: Object, default: () => {} }
})

const emit = defineEmits(['click-btn', 'click-upload'])

const uploadRef = ref(null)

const it = ref(props.item)

// 设置防抖
const counter = ref(0)
const { history } = useThrottledRefHistory(counter, { deep: true, throttle: 1000 })

// 按钮点击事件
const handleClick = () => {
  counter.value++
}

// 上传文件成功
const handleUpload = (file) => {
  let findLast = file.name.lastIndexOf('.')
  let fileType = file.name.slice(findLast)
  let acceptArr = it.value.accept.split(',')
  let isPush = false
  acceptArr.forEach((item) => {
    // 判断上传的文件大小是否正确
    let fileSize = file.size / (1024 * 1024)
    if (fileSize > 5) {
      isPush = true
      openMessageBox('上传失败', 'error')
      return
    }

    // 判断上传的格式是否正确
    if (item === fileType) {
      emit('click-upload', file)
      isPush = true
      return
    }
  })
  if (!isPush) {
    openMessageBox('不支持该文件格式', 'error')
    emit('click-upload', 'close')
  }
}

// 按钮点击事件 通知至外层
watch(
  () => history.value,
  () => {
    emit('click-btn')
  }
)

// 监听value值
watch(
  () => props.item,
  (newValue) => {
    it.value = newValue
  }
)

// 向外暴露
defineExpose({
  uploadRef
})
</script>
<style lang="scss">
.btn-content {
  font-size: 14px;
  // height: 100%;

  cursor: pointer;
  // width: 100%;
  display: inline-block;
  .el-button {
    // width: 100%;
    // height: 100%;
  }
}
</style>
