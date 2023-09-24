import axios from 'axios'
// import { useStore } from '@/store'
import { BASE_URL } from '@/environment'
import { openMessageBox } from '@/utils/common'
import { RESPONSE_CODE } from '@/constants/response-code'
import { httpConfig } from './setting-config'
// import storageLocal from '@/utils/storage'
// import { login } from '@/config/constants/hint'
import router from '@/router'

// const auth = computed(() => {
//   return useStore('auth')
// })

// const LoadingInstance = {
//   _target: null,
//   _count: 0
// }
export class Http {
  constructor(baseURL = BASE_URL, customOptions) {
    this.custom_options = Object.assign(
      {
        loading: httpConfig.overallLoading, // 是否开启loading
        error_message_show: httpConfig.showErrorMessage, // 是否开启错误提示,
        response_data_format: httpConfig.responseFormat, // 是否格式化响应数据
        code_message_show: true // 是否开启code不为0提示
      },
      customOptions
    )
    this.loadingOptions = {
      text: httpConfig.loadingOptionsText
    }
    this.instance = axios.create({
      baseURL,
      withCredentials: false, // 跨域携带 cookie
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 10000
    })
    this.interceptors()
  }

  interceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // 是否开启加载页
        // const isOpenLoading = httpConfig.debounce.find((item) => checkStart(config.url, item))
        // // 开启全局 并且 当前请求不以[非loading页] 为开头
        // if (this.custom_options.loading && !isOpenLoading) {
        //   LoadingInstance._count++
        //   if (LoadingInstance._count === 1) {
        //     LoadingInstance._target = ElLoading.service(this.loadingOptions)
        //   }
        // }

        // // 按需求携带请求头
        // const localData = storageLocal.getCache('pinia_auth')

        // if (localData?.isLogin) {
        //   config.headers.Authorization = localData.token
        //   config.headers.AuthorizationLoginName = localData.userInfo.loginName
        // }
        return config
      },
      (error) => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // this.custom_options.loading && closeLoading(this.custom_options)

        if (this.custom_options.code_message_show && response.data) {
          // 登录超时
          if (response.data.code === RESPONSE_CODE.UAC_TIMEOUT) {
            // auth.value.logoutAction()
            return Promise.reject(response.data)
          } else if (response.data.statusCode !== 200) {
            openMessageBox(response.data.msg, 'error')
            return Promise.reject(response.data)
          }
        }
        return this.custom_options.response_data_format ? response.data : response
      },
      (error) => {
        // this.custom_options.loading && closeLoading(this.custom_options)
        window.sessionStorage.clear()
        router.push('/account_manage')
        errTip(error)
        Promise.reject(error)
      }
    )
  }

  request(method, url, param, axiosConfig) {
    const options = {
      method,
      url,
      ...param,
      ...axiosConfig
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request(options)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  post(url, params, config) {
    return this.request('post', url, { data: params }, config)
  }

  get(url, params, config) {
    return this.request('get', url, { params }, config)
  }
}

// function closeLoading(options) {
//   if (options.loading && LoadingInstance._count > 0) {
//     LoadingInstance._count--
//   }
//   if (LoadingInstance._count === 0) {
//     LoadingInstance._target.close()
//     LoadingInstance._target = null
//   }
// }

function errTip(error, msg = '未知错误') {
  const tip = {
    400: '请求错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: `请求地址出错${error?.response?.config?.url}`,
    405: `请求方式不允许`,
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持'
  }
  openMessageBox(tip[error?.response?.status] || msg, 'error')
}

export default new Http()
