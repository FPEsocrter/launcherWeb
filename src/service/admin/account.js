// 账号管理-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  ACCOUNT_LIST: '/environment/page', //列表
  ACCOUNT_DEL: '/environment/delete' //删除
}

/**
 * 账号管理 获取账号管理列表
 * @param {Object} params
 * @param {string} params.keyword - 关键字
 * @param {integer} params.currentPage - 页码
 * @param {integer} params.pageSize - 分页的大小
 * @return {*}
 */
export const GetAccountList = (params) => {
  return zlRequest.post(API.ACCOUNT_LIST, {
    keyword: params?.keyword,
    currentPage: params?.pageNo,
    pageSize: params?.pageSize,
    webProxy: params?.webProxy,
    name: params?.name,
    remark: params?.remark,
    area: params?.area
  })
}

/**
 * 账号管理 删除
 * @param {Object} params
 * @param {integer} id - id
 * @return {*}
 */
export const DelAccountList = (params) => {
  return zlRequest.post(API.ACCOUNT_DEL, params)
}
