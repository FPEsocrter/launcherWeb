<!-- 账号管理 -->
<template>
  <div class="account-content">
    <!-- 1.搜索 -->
    <div class="account-search">
      <el-input
        :prefix-icon="Search"
        v-model="searchForm.keyword"
        class="input-with-select"
        clearable
        placeholder="搜索"
        style="width: 280px"
        @clear="handleSearch"
        @keydown.enter="handleSearch"
        @blur="handleSearch"
      />
    </div>
    <!-- 2.表格 -->
    <div class="account-table">
      <table-vue v-model:select-list="selectList" :columns="columns" :list="userList">
        <template #custom="{ row }">
          <hs-button :item="definitionBtn" @click-btn="handleOpen(row)" />
        </template>
        <!-- 2.1下拉 -->
        <template #btn="{ row }">
          <el-dropdown size="small" @command="handleCommand">
            <span class="account-dropdown" @mouseenter="handleMouseenter(row)">
              <icon-font icon="icon-icon1" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit">编辑</el-dropdown-item>
                <el-dropdown-item command="delete">删除</el-dropdown-item>
                <el-dropdown-item command="fixAgent">修改代理</el-dropdown-item>
                <el-dropdown-item command="fixPrint">修改指纹</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </table-vue>
      <pagination-vue v-model="paginationForm.pageNo" :size="paginationForm.pageSize" :total="pageInfo.total" />
    </div>
    <fix-agent-dialog v-model="isAgent" :row="clikeRow" />
    <fix-print-dialog v-model="isPrint" :row="clikeRow" />
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import tableVue from '@/components/business/table.vue'
import HsButton from '@/components/assembly/HsButton.vue'
import paginationVue from '@/components/business/pagination.vue'
import { GetAccountList, DelAccountList } from '@/service/admin/account'
import { onMounted } from 'vue'
import { prePrecessDateAll } from '@/utils/common'
import { useRouter } from 'vue-router'
import FixAgentDialog from './components/FixAgentDialog.vue'
import FixPrintDialog from './components/FixPrintDialog.vue'

const router = useRouter()

const searchForm = ref({
  keyword: null
})

// 是否显示 修改代理 弹窗
const isAgent = ref(false)

// 是否显示 修改指纹 弹窗
const isPrint = ref(false)

// 筛选
const handleSearch = () => {
  getList()
}

// 多选-选中列表
const selectList = ref([])

// 用户列表
const userList = ref([
  {
    id: 1,
    name: 'abc',
    name1: '哈哈',
    ip: '192.168.12.0',
    history: '2023-08-27'
  },
  {
    id: 2,
    name: 'abc',
    name1: '哈哈',
    ip: '192.168.12.0',
    history: '2023-08-27'
  }
])

// 表格 列
const columns = ref([
  { prop: 'name', label: '名称', width: '140' },
  { prop: 'name1', label: '备注', width: '200' },
  { prop: 'ip', label: 'ip', width: '200' },
  { prop: 'history', label: '最近打开', width: '220' },
  { prop: 'custom', label: '打开', width: '110', fixed: 'right' },
  { prop: 'option', label: '操作', width: '80', fixed: 'right' }
])

// 分页
const paginationForm = ref({
  pageNo: 1,
  pageSize: 10
})

// 接口获取的分页信息
const pageInfo = ref({})

// 按钮定义
const definitionBtn = { text: '打开', type: 'primary', size: 'small' }

// 操作-鼠标移入记录当前row
const clikeRow = ref(null)
const handleMouseenter = (row) => {
  clikeRow.value = row
}

// 操作-下拉触发
const handleCommand = (command) => {
  switch (command) {
    // 编辑（全
    case 'edit':
      router.push({
        path: '/browser_add',
        query: {
          id: clikeRow.value.id
        }
      })
      break
    // 删除
    case 'delete':
      DelAccountList(clikeRow.value.id).then((res) => {
        console.log(res)
      })
      break
    // 修改代理
    case 'fixAgent':
      isAgent.value = true
      break
    // 修改指纹
    case 'fixPrint':
      isPrint.value = true
      break
  }
}

// 打开浏览器
const handleOpen = (row) => {
  console.log(row)
}

// 获取列表
const getList = () => {
  // 合并分页、搜索
  let postForm = prePrecessDateAll(Object.assign(searchForm.value, paginationForm.value))
  GetAccountList(postForm).then((res) => {
    console.log(res)
  })
}

onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.account-content {
  height: 100%;
  border-radius: 8px;
  .account-search {
    background-color: white;
    padding: 10px 10px;
    border-radius: 8px;
    display: flex;
    // 筛选控件
    > div {
      padding-right: 16px;
    }
  }
  .account-table {
    border-radius: 8px;
    background-color: white;
    margin-top: 10px;
    height: calc(100% - 52px - 10px - 20px);
    padding: 10px;
    position: relative;
    .account-dropdown {
      cursor: pointer;
    }
  }
}
.el-dropdown {
  height: 23px;
  line-height: 23px;
}
</style>
