// 浏览器表单-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  RANDOM_GET: '/random', //生成新指纹
  BROWSER_ADD: '/environment/add', //新增环境
  BROWSER_FIX: '/environment/modify', //修改环境
  BROWSER_ADD_SINGLE: '/environment/get', //查询单个环境详情
  AGENT_FIX: '/environment/get', //代理
  PRINT_FIX: '/environment/get' //指纹
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
 * 编辑浏览器
 * @param {Object} params
 * @return {*}
 */
export const FixBrowserApi = (params) => {
  return zlRequest.post(API.BROWSER_FIX, params)
}

/**
 * 查询详情
 * @param {Object} params
 * @param {Object} params.id
 * @return {*}
 */
export const GetBrowserApi = (params) => {
  return zlRequest.post(API.BROWSER_ADD_SINGLE, {
    id: params.id,
    environment: true,
    webProxy: true,
    fingerprint: true,
    chromiumData: true
  })
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
export const GetAgentApi = (params) => {
  return zlRequest.post(API.AGENT_FIX, {
    id: params.id,
    environment: true,
    fingerprint: true,
    chromiumData: true
  })
}

/**
 * 修改指纹
 * @param {Object} params
 * @return {*}
 */
export const GetPrintApi = (params) => {
  return zlRequest.post(API.PRINT_FIX, {
    id: params.id,
    fingerprint: true
  })
}
