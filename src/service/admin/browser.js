// 浏览器表单-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  RANDOM_GET: '/random', //生成新指纹
  BROWSER_ADD: '/environment/add', //新增环境
  BROWSER_FIX: '/environment/modify', //修改环境
  BROWSER_ADD_SINGLE: '/environment/get', //查询单个环境详情
  AGENT_FIX: '/environment/get', //代理
  PRINT_FIX: '/environment/get', //指纹
  CHECK_NETWORK: '/webProxy/detection', //检查代理
  UA_MAJOR_VERSION: '/fingerprint/getUaMajorVersion',
  UA_BY_VERSION: '/fingerprint/getUaByVersion'
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
 * @param {Boolean} params.webProxy
 * @param {Boolean} params.fingerprint
 * @param {Boolean} params.chromiumData
 * @return {*}
 */
export const GetBrowserApi = (params) => {
  return zlRequest.post(API.BROWSER_ADD_SINGLE, params)
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

/**
 * 检查网络
 * @param {Object} params
 * @return {*}
 */
export const CheckNetWordkApi = (params) => {
  return zlRequest.post(API.CHECK_NETWORK, params)
}

/**
 * 获取ua核心版本号
 * @returns {*}
 */
export const UaMajorVersionApi = (params) => {
  return zlRequest.post(API.UA_MAJOR_VERSION, params)
}

/**
 * 获取ua核心版本号
 * @returns {*}
 */
export const UaByVersionApi = (params) => {
  return zlRequest.post(API.UA_BY_VERSION, params)
}
