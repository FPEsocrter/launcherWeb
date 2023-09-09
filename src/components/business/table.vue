<!--
  list:列表数据
  columns:列属性
  columns.prop:每行对应的字段名
  columns.label:列名
  columns.width:1440分辨率下的列宽
  columns:列属性
  check：是否显示复选
  number：是否显示序号
  fixed：列固定
  v-model:select-list="ArrName",绑定 多选列表
  [注意!!]如有按钮的操作列 prop必须为"option",操作列插槽名“btn”
          object.delete:是否显示单个删除按钮
          propp为custom：自定义
-->

<template>
  <div class="table-content">
    <el-table :key="newTime" :data="tableList" fit header-row-class-name="table-header-style" :height="calcColHeight(460)" style="width: 100%" @selection-change="handleSelectionChange">
      <!-- 复选 -->
      <el-table-column v-if="check" type="selection" width="50" />
      <!-- 索引 -->
      <el-table-column v-if="number" label="序号" :width="numberWidth ? numberWidth : '60'">
        <template #default="{ $index }">{{ $index + 1 }}</template>
      </el-table-column>
      <!-- 其他列 -->
      <template v-for="(item, index) in columns" :key="index">
        <el-table-column v-if="item.prop == 'option'" :fixed="item.fixed ? item.fixed : false" :label="item.label" :min-width="calcColWidth(item.width)" :show-overflow-tooltip="true">
          <template #default="{ row }">
            <slot name="btn" :row="row">按钮</slot>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.prop == 'custom'" :fixed="item.fixed ? item.fixed : false" :label="item.label" :min-width="calcColWidth(item.width)" :show-overflow-tooltip="true">
          <template #default="{ row }">
            <slot name="custom" :row="row">自定义</slot>
          </template>
        </el-table-column>
        <el-table-column v-else :label="item.label" :fixed="item.fixed ? item.fixed : false" :min-width="calcColWidth(item.width)" :prop="item.prop" :show-overflow-tooltip="true">
          <template #default="{ row }">
            {{ row[item.prop] ? row[item.prop] : '-' }}
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps({
  list: { type: Array, default: () => [] }, //表格列表
  columns: { type: Array, default: () => [] }, //列
  check: { type: Boolean, default: false }, //是否复选
  number: { type: Boolean, default: false }, //是否有序号
  selectList: { type: Array, default: () => [] }, //多选列表
  numberWidth: { type: String, default: '' } //索引长度
})

const emit = defineEmits(['update:selectList'])

const tableList = ref(props.list)

const newTime = ref(new Date().getTime())

// 多选触发
const handleSelectionChange = (arr) => {
  if (props.check) {
    emit('update:selectList', arr)
  }
}

// 计算当前视口下的 表格高度
const calcColHeight = (height) => {
  let standard = 756 //以1440分辨率下的谷歌全屏为基准
  let clientHeight = document.body.clientHeight
  // 乘积保留1位小数（不四舍五入）
  let product = Math.floor((clientHeight / standard) * 10) / 10
  return product * height
}

// 计算当前视口下的列宽
const calcColWidth = (width) => {
  let standard = 1440 //以1440尺寸为基准
  let clientWidth = document.body.clientWidth
  // 当前环境
  // const environment = window.navigator.userAgent.toLowerCase()
  // 是否edg浏览器（该浏览器多余出部分宽高）
  // if (environment.match(/edg/i) == 'edg') {
  //   standard -= 57
  // }
  // 乘积保留1位小数（不四舍五入）
  let product = Math.floor((clientWidth / standard) * 10) / 10
  return product * width
}

watch(
  () => props.list,
  (newArr) => {
    tableList.value = newArr
  }
)

// 监听窗口变化 重新渲染
window.onresize = () => {
  newTime.value = new Date().getTime()
}
</script>
<style lang="scss" scoped>
.table-content {
}
</style>
