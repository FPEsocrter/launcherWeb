<!-- 登录 -->
<template>
  <div class="login-container">
    <el-main class="login-content">
      <div class="login-form">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <div class="form-header">
            <img src="@/assets/images/logo.png" alt="" />
            <p class="form-title">
              {{ init.systemName }}
            </p>
          </div>
          <div class="login-form-content">
            <el-form-item label="" prop="loginName" style="margin-bottom: 20px">
              <el-input placeholder="请输入账号" v-model="loginForm.loginName" @keyup.enter="submitForm()" />
            </el-form-item>
            <el-form-item label="" prop="password" style="margin-bottom: 20px">
              <el-input placeholder="请输入密码" type="password" v-model="loginForm.password" @keyup.enter="submitForm()" show-password />
            </el-form-item>
            <span class="forget-password" @click="handleChange"> {{ !islogin ? '登录' : '注册' }} </span>
          </div>
          <div class="login-form-btn">
            <el-button style="width: 100%" :loading="isLoad" size="medium" type="primary" @click="submitForm()">{{ islogin ? '登录' : '注册' }}</el-button>
          </div>
        </el-form>
      </div>
    </el-main>
    <div class="login-footer">{{ init.systemSupport }}</div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const init = ref({
  systemName: 'Escort',
  systemLogo: null,
  systemSupport: 'author_zjj'
})

const loginForm = ref({
  loginName: null,
  password: null
})

// 登录 / 注册
const islogin = ref(true)

const rules = ref({
  loginName: [
    { required: true, message: '请输入登录名', trigger: 'blur' },
    {
      min: 4,
      max: 12,
      message: '登录名长度在4-12个字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '密码长度为8-16个字符', trigger: 'blur' }
  ]
})

const handleChange = () => {
  islogin.value = !islogin.value
}

// 登录
const submitForm = () => {
  if (islogin) {
    // 登录
    router.push('/admin')
  } else {
    // 注册
    router.push('/admin')
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  background: url('@/assets/images/bg_3.jpg') no-repeat center 0px;
  background-size: cover;
  background-position: center;
  text-align: center;
  height: 100vh;
  position: relative;
}

.login-content {
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
.login-form {
  box-sizing: border-box;
  padding: 35px 60px;
  width: 500px;
  height: 420px;
  background-color: white;
  ::v-deep .login-form-content {
    position: relative;
    margin-bottom: 70px;
    // 表单
    .el-input__inner {
      height: 40px !important;
    }
    .el-input__icon {
      line-height: 40px !important;
    }
  }
  .form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    img {
      height: 66px;
      width: 66px;
    }
    .form-title {
      font-family: '优社标题黑';
      font-size: 33px;
      margin: 0;
      margin-left: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .forget-password {
    position: absolute;
    right: 0px;
    bottom: -32px;
    color: #158fff;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .login-form-btn {
    .el-button {
      height: 40px;
    }
  }
}
.login-footer {
  color: #4e5969;
  font-size: 14px;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}
</style>
