// 意见中心
import zlRequest from '@/utils/http/index'

export const API = {
  FEEDBACK: '/local/feedback'
}

/**
 * 添加意见反馈
 * @param {Object} params
 * @return {*}
 */
export const AddFeedbackApi = (params) => {
  return zlRequest.post(API.FEEDBACK, params)
}
