<template>
  <div class="pagination-content">
    <el-pagination
      small
      v-model:current-page="current"
      v-model:page-size="pageSize3"
      :background="background"
      layout="total,prev, pager, next, jumper"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 }, //pageNo
  total: { type: Number, default: 0 },
  size: { type: Number, default: 10 }
})

const emit = defineEmits(['update:modelValue'])
// 页码
const current = ref(props.modelValue)

const pageSize3 = ref(props.size)
const background = ref(false)

// page-size 改变时触发
const handleSizeChange = () => {
  console.log(`size变化${pageSize3.value}`)
}

// current-page 改变时触发
const handleCurrentChange = () => {
  emit('update:modelValue', current.value)
}
</script>
<style lang="scss" scoped>
.pagination-content {
  width: 100%;
  display: flex;
  justify-content: right;
  right: 20px;
  position: absolute;
  bottom: 20px;
}
</style>
