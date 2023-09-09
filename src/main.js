import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入字体图标
// import '@/assets/font/iconfont.js'
import '@/assets/font/iconfont.css'
import { IconFont } from '@/components/Icon'

// 导入公共样式
import './styles/index.scss'

// 创建
const app = createApp(App)

// 全局注册 图标库
app.component('IconFont', IconFont)

// 挂载中文第三方组件
app.use(ElementPlus, {
  locale: zhCn
})

// 挂载
app.use(store).use(router).mount('#app')
