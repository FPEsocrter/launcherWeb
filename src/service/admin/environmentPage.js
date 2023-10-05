// 账号管理-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  ENVIRONMENT_PAGE: '/environment/page', //列表
  ACCOUNT_DEL: '/environment/delete' //删除
}

/**
 * 账号管理 获取账号管理列表
 * @param {Object} params
 * @param {string} params.webProxyType - 代理类型
 * @param {String} params.name - 环境名称
 * @param {String} params.remark - 环境备注
 * @param {String} params.area - 环境区域
 * @param {integer} params.currentPage - 页码
 * @param {integer} params.pageSize - 分页的大小
 * @return {total:0,list:{rowNumber:0,SerialNumber:id,name,remark,lastUseIp,area,lastOpenTime,webProxyType}}
 */
export const GetEnvironmentPage = (params) => {
  return zlRequest.post(API.ENVIRONMENT_PAGE, params)
}

/**
 * 账号管理 删除
 * @param {Array} params
 * @return {*}
 */
export const DelEnvironment = (params) => {
  return zlRequest.post(API.ACCOUNT_DEL, { ids: params })
}
