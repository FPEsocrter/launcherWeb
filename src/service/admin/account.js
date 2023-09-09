// 账号管理-请求地址
import zlRequest from '@/utils/http/index'

export const API = {
  ACCOUNT_LIST: '/admin/account', //列表
  ACCOUNT_DEL: '/admin/log/batch' //删除
}

/**
 * 账号管理 获取账号管理列表
 * @param {Object} params
 * @param {string} params.keyword - 关键字
 * @param {integer} params.groupId - 分组类型: 1-系统日志，2-后台管理
 * @param {integer} params.pageNo - 页码
 * @param {integer} params.pageRows - 每页显示条数
 * @return {*}
 */
export const GetAccountList = (params) => {
  return zlRequest.get(API.ACCOUNT_LIST, params)
}

/**
 * 账号管理 删除
 * @param {Object} params
 * @param {integer} id - id
 * @return {*}
 */
export const DelAccountList = (id) => {
  return zlRequest.request('delete', API.ACCOUNT_DEL, {
    data: {
      accountId: id
    }
  })
}
