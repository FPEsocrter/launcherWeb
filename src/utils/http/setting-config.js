// 请求/响应前-通用配置
export const httpConfig = {
  // 不经过token校验的路由，白名单
  routesWhiteList: ['/login', '/reset'],
  //   是否添加全局loading
  overallLoading: true,
  // 不需要加loading层的请求(局部几个不需要加载页的)，防止重复提交;如'/admin'为/admin开头的地址不需要loading
  debounce: ['/doEdit'],
  //   加载页文本
  loadingOptionsText: '加载中...',
  // 是否开启错误提示,
  showErrorMessage: true,
  // 是否格式化响应数据
  responseFormat: true
}
