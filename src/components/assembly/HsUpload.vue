<!--表带内-携带样式的文件上传
  tit:label名
  prop:规则验证的位置
  rules：验证规则
  emptyLabel:小红点是否隐藏
  width:选择框长度[不写默认100%]
-->
<template>
  <el-form-item class="btn-content" :class="{ 'empty-label': it.emptyLabel ? true : false }" :label="it.tit" :prop="it.prop" :rules="it.rules ? it.rules : ''">
    <el-upload
      v-model:file-list="fileList"
      :before-remove="beforeRemove"
      class="upload-demo"
      :limit="2"
      multiple
      :on-change="handleChange"
      :auto-upload="false"
      :on-exceed="handleExceed"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
    >
      <el-tooltip class="box-item" effect="dark" :content="'音频格式支持:MP3.M4A.PCM.WAV.AMR;视频格式支持:AVI.MP4.MOV'" placement="top-start">
        <el-button :style="{ width: it.width ? it.width + 'px' : '100%' }" type="primary"><icon-font icon="icon-dianjishangchuan" />上传</el-button>
      </el-tooltip>
    </el-upload>
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  item: { type: Object, default: () => {} },
  placeholder: { typ: String, default: '请输入' }
})
const val = ref(props.modelValue)

const fileList = ref([])

const it = ref(props.item)

const handleChange = () => {}

defineExpose({
  val
})
</script>
<style lang="scss" scoped>
.btn-content {
  font-size: 14px;
  height: 100%;
  cursor: pointer;
  display: flex;
  .el-button {
    width: 100%;
    height: 100%;
    :deep(.iconfont) {
      font-size: 14px !important;
      margin-right: 8px;
    }
  }
  .upload-demo {
    width: 100%;
  }
}

:deep(.el-upload-list) {
  margin: 8px 0 0 !important;
  li {
    height: 26px;
    line-height: 26px;
    margin-bottom: 0;
  }
}
</style>
