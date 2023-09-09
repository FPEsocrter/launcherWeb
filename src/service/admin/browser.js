// 浏览器表单-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  RANDOM_GET: '/random', //生成新指纹
  BROWSER_ADD: '/browser', //列表
  AGENT_FIX: '/agent', //代理
  PRINT_FIX: '/print' //指纹
}

/**
 * 新建浏览器
 * @param {Object} params
 * @return {*}
 */
export const AddBrowserApi = (params) => {
  return zlRequest.post(API.BROWSER_ADD, params)
}

/**
 * 查询详情
 * @param {Object} params
 * @param {Object} params.id
 * @return {*}
 */
export const GetBrowserApi = (params) => {
  return zlRequest.get(API.BROWSER_ADD, params)
}

/**
 * 新建浏览器-生成新指纹
 * @param {Object} params
 * @return {*}
 */
export const GetRandomApi = () => {
  return zlRequest.get(API.RANDOM_GET)
}

/**
 * 修改代理
 * @param {Object} params
 * @return {*}
 */
export const PutAgentApi = (params) => {
  return zlRequest.request('put', API.AGENT_FIX, {
    data: params
  })
}

/**
 * 修改指纹
 * @param {Object} params
 * @return {*}
 */
export const PutPrintApi = (params) => {
  return zlRequest.request('put', API.PRINT_FIX, {
    data: params
  })
}
