<!-- 账号管理 -->
<template>
  <div class="account-content">
    <!-- 1.搜索 -->
    <div class="account-search">
      <div class="account-search-left">
        <fs-select v-model="searchForm.webProxy" placeholder="代理类型" style="width: 110px" :items="webProxyType" clearable />
        <el-input :prefix-icon="Search" v-model="searchForm.name" class="input-with-select" clearable placeholder="请输入环境名称" style="width: 160px" />
        <el-input :prefix-icon="Search" v-model="searchForm.remark" class="input-with-select" clearable placeholder="请输入环境备注" style="width: 160px" />
        <el-input :prefix-icon="Search" v-model="searchForm.area" class="input-with-select" clearable placeholder="请输入环境区域" style="width: 160px" />
      </div>
      <div class="account-search-right">
        <fs-button size="default" type="primary" @click="handleReset">重置</fs-button>
        <fs-button size="default" type="primary" @click="handleSearch">查询</fs-button>
      </div>
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
              <icon-font icon="icon-xitongpeizhi" />
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
      <div>
        <el-pagination
          v-model:current-page="page.pageNo"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          :small="small"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="tablePage.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <fix-agent-dialog v-model="isAgent" :row="clikeRow" @update-list="getList" />
    <fix-print-dialog v-model="isPrint" :row="clikeRow" @update-list="getList" />
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import tableVue from '@/components/business/table.vue'
import HsButton from '@/components/assembly/hs/HsButton.vue'
import { GetAccountList, DelAccountList } from '@/service/admin/environmentPage'
import { onMounted } from 'vue'
import { prePrecessDateAll, openMessageBox } from '@/utils/common'
import { useRouter } from 'vue-router'
import FixAgentDialog from './components/FixAgentDialog.vue'
import FixPrintDialog from './components/FixPrintDialog.vue'
import { webProxyType } from '@/domain/enum/webProxyType'

const router = useRouter()

const searchForm = reactive({
  webProxy: null,
  name: null,
  remark: null,
  area: null
})

const tablePage = reactive({
  total: 0,
  list: []
  //{name:'',remark:'',lastUseIp:'',lastOpenTime:''}
})

// 分页
const page = reactive({
  pageNo: 1,
  pageSize: 10
})

const handleReset = () => {
  searchForm.webProxy = null
  searchForm.name = null
  searchForm.remark = null
  searchForm.area = null
}

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

// 表格 列
const columns = ref([
  { prop: 'name', label: '名称', width: '140' },
  { prop: 'remark', label: '备注', width: '200' },
  { prop: 'lastUseIp', label: 'ip', width: '200' },
  { prop: 'lastOpenTime', label: '最近打开', width: '220' },
  { prop: 'custom', label: '打开', width: '110', fixed: 'right' },
  { prop: 'option', label: '操作', width: '80', fixed: 'right' }
])

// 接口获取的分页信息
const pageInfo = ref({
  total: null
})

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
      handleDel()

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
  GetAccountList(prePrecessDateAll({ ...searchForm, ...searchForm })).then(({ data: res }) => {
    pageInfo.value.total = res.total
    userList.value = res.list
  })
}

// 根据id删除
const handleDel = () => {
  DelAccountList({ id: clikeRow.value.id }).then(({ data: res }) => {
    if (res) {
      getList()
      openMessageBox('删除成功', 'success')
    } else {
      openMessageBox('删除失败', 'error')
    }
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
    justify-content: space-between;
    // 筛选控件
    .account-search-left > div {
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
