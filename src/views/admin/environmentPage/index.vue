<!-- 账号管理 -->
<template>
  <div class="account-content">
    <!-- 1.搜索 -->
    <div class="account-search">
      <div class="account-search-left">
        <el-select-f v-model="searchForm.webProxy" placeholder="代理类型" :items="webProxyType" style="width: 160px" clearable />
        <el-input :prefix-icon="Search" v-model="searchForm.name" class="input-with-select" clearable placeholder="请输入环境名称" style="width: 160px" />
        <el-input :prefix-icon="Search" v-model="searchForm.remark" class="input-with-select" clearable placeholder="请输入环境备注" style="width: 160px" />
        <el-input :prefix-icon="Search" v-model="searchForm.area" class="input-with-select" clearable placeholder="请输入环境区域" style="width: 160px" />
      </div>
      <div class="account-search-right">
        <el-button-f size="default" type="primary" @click="handleReset">重置</el-button-f>
        <el-button-f size="default" type="primary" @click="handleSearch">查询</el-button-f>
      </div>
    </div>
    <!-- 2.表格 -->
    <div class="account-table">
      <div class="table-content">
        <!-- {rowNumber:0,SerialNumber:id,name,remark,lastUseIp,area,lastOpenTime,webProxyType} -->
        <el-table :data="tablePage.list" style="width: 100%">
          <el-table-column prop="rowNumber" label="行号" width="60" fixed="left" />
          <el-table-column prop="serialNumber" label="序号" width="100" :show-overflow-tooltip="true" fixed="left" />
          <el-table-column prop="name" label="环境名称" width="180" :show-overflow-tooltip="true" fixed="left" />
          <el-table-column prop="webProxy" label="代理类型" width="100" :formatter="webProxyTypeFormat" />
          <el-table-column prop="remark" label="备注" width="120" :formatter="driverNameFormat" />
          <el-table-column prop="lastUseIp" label="最后一次使用的ip" width="150" :formatter="driverNameFormat" />
          <el-table-column prop="area" label="ip所在地区" width="150" :formatter="driverNameFormat" />
          <el-table-column prop="lastOpenTime" label="最近一次打开的时间" width="150" :formatter="driverNameFormat" />
          <el-table-column label="打开" width="100" fixed="right">
            <template #default="scope">
              <el-button-f size="small" v-if="scope.row.open" @click="handleOpenBrowser(scope.row.id)">打开环境</el-button-f>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60" fixed="right">
            <template #default="scope">
              <el-dropdown size="small" trigger="click">
                <span class="account-dropdown">
                  <icon-font icon="icon-xitongpeizhi" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-button-f size="small" @click="hadnleModify(scope.row.id)">编辑</el-button-f>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button-f size="small" @click=";(deleteInfo.dialog = true), (deleteInfo.ids = [scope.row.id])">删除</el-button-f>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button-f size="small" @click=";(webProxyDia.dialog = true), (webProxyDia.id = scope.row.id)">修改代理</el-button-f>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button-f size="small" @click=";(fingerprintDia.dialog = true), (fingerprintDia.id = scope.row.id)">修改指纹</el-button-f>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-content">
        <el-pagination
          small
          v-model:current-page="page.currentPage"
          v-model:page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40, 50]"
          :background="true"
          layout="sizes, prev, pager, next"
          :total="tablePage.total"
          @size-change="handlePageChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
  <div>
    <el-dialog v-model="deleteInfo.dialog" title="提示" width="30%" draggable>
      <span>确定要删除环境吗</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click=";(deleteInfo.dialog = false), (deleteInfo.ids = [])">取消</el-button>
          <el-button type="primary" @click="handleDelete"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <modify-web-proxy v-model="webProxyDia" @submit="getList(), (webProxyDia.dialog = false)" />
  <modify-fingerprint v-model="fingerprintDia" @submit="getList(), (fingerprintDia.dialog = false)" />
</template>
<script setup>
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { webProxyType } from '@/domain/enum/webProxyType'
import modifyWebProxy from './components/modifyWebProxy.vue'
import modifyFingerprint from './components/modifyFingerprint.vue'
import { prePrecessDateAll, openMessageBox } from '@/utils/common'
import { GetEnvironmentPage, DelEnvironment, OpenEnvironment } from '@/service/admin/environmentPage'
import { onMounted } from 'vue'

const router = useRouter()
router
const searchForm = reactive({
  webProxy: null,
  name: null,
  remark: null,
  area: null
})
const deleteInfo = reactive({
  dialog: false,
  ids: []
})

const webProxyDia = reactive({
  dialog: false,
  id: 0
})

const fingerprintDia = reactive({
  dialog: false,
  id: 0
})

const handleOpenBrowser = (id) => {
  OpenEnvironment([id])
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

const tablePage = reactive({
  total: 0,
  list: []
  //{name:'',remark:'',lastUseIp:'',lastOpenTime:''},
})

// 分页
const page = reactive({
  currentPage: 1,
  pageSize: 10
})

const getList = () => {
  GetEnvironmentPage(prePrecessDateAll({ ...searchForm, ...page }))
    .then((res) => {
      if (res.statusCode != 200) {
        return
      }
      tablePage.total = res.data.total
      tablePage.list = res.data.list
    })
    .catch((error) => {
      openMessageBox(error, 'error')
    })
}

const handleReset = () => {
  searchForm.webProxy = null
  searchForm.name = null
  searchForm.remark = null
  searchForm.area = null
}

const handleSearch = getList

const handlePageChange = getList

const driverNameFormat = (row, clom) => {
  // console.log(row)
  return row[clom.property] == null || row[clom.property] == 'null' ? '' : row[clom.property]
}
const typeKeys = Object.keys(webProxyType)
const webProxyTypeFormat = (row, clom) => {
  return typeKeys[row[clom.property]]
}

const hadnleModify = (id) => {
  router.push({
    path: '/browser_add',
    query: { id: id }
  })
}

const handleDelete = () => {
  DelEnvironment(deleteInfo.ids)
    .then(({ data: res }) => {
      deleteInfo.dialog = false
      deleteInfo.ids = []
      if (res) {
        openMessageBox('删除成功', 'success')
      } else {
        openMessageBox('删除失败', 'error')
      }
      getList()
    })
    .catch((error) => {
      openMessageBox(error, 'error')
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

:deep(.el-dropdown-menu__item) {
  padding: 0 !important;
  .el-button {
    width: 100%;
    border: none !important;
  }
}
</style>
