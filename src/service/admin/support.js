// 意见中心
import zlRequest from '@/utils/http/index'

export const API = {
  FEEDBACK: '/local/feedback'
}

/**
 * 添加意见反馈
 * @param {Object} params
 * @param {string} params.rate - 评分
 * @param {String} params.suggestion - 意见反馈
 * @param {String} params.phone - 手机号码
 * @param {String} params.wechat - 微信
 * @param {integer} params.skype - Skype
 * @return {*}
 */
export const AddFeedbackApi = (params) => {
  return zlRequest.post(API.FEEDBACK, params)
}
