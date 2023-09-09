<!-- menu菜单 -->
<template>
  <div class="left-content">
    <div class="left-content-title">
      <img src="@/assets/images/logo.png" alt="" />
      <div class="title-text">Escort</div>
    </div>
    <!-- 新建 -->
    <div class="left-content-add">
      <browser-add @clickAdd="clickAdd" />
    </div>
    <div class="menu-content">
      <el-menu class="el-menu-vertical" router :default-active="active" @close="handleClose" @open="handleOpen">
        <el-sub-menu index="common">
          <template #title>
            <icon-font icon="icon-icon1" />
            <span class="menu-sub-title">常用</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="account_manage">
              <icon-font icon="icon-icon1" />
              <span>环境管理</span>
            </el-menu-item>
            <!-- <el-menu-item index="browser_add">
              <icon-font icon="icon-icon1" />
              <span>abc</span>
            </el-menu-item> -->
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import BrowserAdd from '@/views/common/BrowserAdd.vue'

// 默认账号管理
let active = ref('account_manage')

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const clickAdd = () => {
  active.value = ''
}
</script>

<style lang="scss" scoped>
.left-content-title {
  display: flex;
  align-items: center;
  margin-top: 10px;
  img {
    width: 40px;
    margin: 0 20px 0 20px;
  }
  .title-text {
    font-size: 22px;
    font-weight: 700;
  }
}

.left-content-add {
  height: 40px;
  margin: 15px 0 20px 0;
}

.menu-content {
  .el-sub-menu__title {
    a {
      color: #cbccd1;
    }
  }
  .el-menu-vertical {
    a {
      font-size: 18px;
    }
    .menu-sub-title {
      margin-left: 10px;
      font-size: 12px;
      color: #cbccd1;
    }
  }
}
</style>
