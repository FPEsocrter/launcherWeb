// 公用方法

import { ElMessage, ElMessageBox } from 'element-plus'
import { message } from './resetMessage'
// import { DictListApi } from '@/service/core/conference'
// import { useStore } from '@/store'
// import { RESPONSE_CODE } from '@/config/constants/response-code'

// 引用http的没有加 请求拦截
// import http from 'axios'

import { BASE_URL, VPR_URL } from '@/environment'

// import storageLocal from '@/utils/storage'

export const HREF_URL = BASE_URL
export const VOICE_URL = VPR_URL

/**
 *  字典类型查询字典列表
 * @param {string} type  字典类型
 * @param {array} arr 原数组(会更改这个原数组的数据)
 * @returns {*}
 */
// export const getDictType = (type, arr) => {
//   DictListApi({ dictType: type }).then(({ data }) => {
//     arr.value = data
//       .map((item) => {
//         return { key: item.name, value: item.id, enabled: item.enabled }
//       })
//       .filter((item) => item.enabled)
//   })
// }

/**
 *  字典类型查询字典列表 等待查询结果 有返回值
 * @param {string} type  字典类型
 * @returns {array}
 */
// export const getDictTypeList = async (type) => {
//   const { data } = await DictListApi({ dictType: type })
//   let arr = data
//     .map((item) => {
//       return { key: item.name, value: item.id, enabled: item.enabled }
//     })
//     .filter((item) => item.enabled)
//   return arr
// }

/**
 *  删除对象中值 为空的所有属性
 * @param {object} formData 目标对象
 * @returns {object} 将删除空属性后的对象 返回
 */
export const prePrecessDate = (formData) => {
  return Object.keys(formData)
    .filter((key) => formData[key] !== null && formData[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: formData[key] }), {})
}

/**
 *  删除对象中值 为空的所有属性(包括空串)
 * @param {object} formData 目标对象
 * @returns {object} 将删除空属性后的对象 返回
 */
export const prePrecessDateAll = (formData) => {
  return Object.keys(formData)
    .filter((key) => formData[key] !== null && formData[key] !== undefined && formData[key] !== '')
    .reduce((acc, key) => ({ ...acc, [key]: formData[key] }), {})
}

/**
 *  将数组里的空值 修改为 "\"
 * @param {object} formData 目标对象
 * @returns {object} 将删除空属性后的对象 返回
 */
export const transitionArr = (arr) => {
  console
  if (arr.length) {
    arr.forEach((item) => {
      console.log(item)
    })
  }
  return arr
}

/**
 *  弹窗提示
 * @param {string} content 文本内容
 * @param {string} tipsType 提示框类型(error,success,warning,message)
 * @returns {*}
 */
export const openMessageBox = (content, tipsType) => {
  message[tipsType](content)
}

/**
 *  弹窗提示
 * @param {string} content 文本内容
 * @param {string} tipsType 提示框类型(error,success,warning,message)
 * @returns {*}
 */
export const openMessageBoxB = (content, tipsType) => {
  ElMessage({
    message: content,
    type: tipsType,
    duration: 1500
  })
}

/**
 *  弹窗提示
 * @param {string} content 文本内容
 * @param {string} title 标题
 * @param {function} func 回调
 * @returns {*}
 */
export const openElMessageBox = (content, title = '提示', func, confirmName = '确定', type) => {
  ElMessageBox.alert(content, title, {
    type: type,
    confirmButtonText: confirmName,

    callback: (action) => {
      if (func) {
        func(action)
      }
    }
  })
}

/**
 *  将一般对象转换为 formData
 * @param {object} form 需要转换的一般对象
 * @returns {object} 转化后
 */
export const convertFormData = (form) => {
  const formData = new FormData()
  for (const key in form) {
    formData.append(key, form[key])
  }
  return formData
}

/**
 *  导出数据
 * @param {string} url 请求地址 如/admin/log/export
 * @param {object} postForm 参数
 * @param {string} 下载至本地文件名 参数
 */
// export const exportData = (url, postForm, fileName, method, callBack, callBackFinally) => {
//   const localData = storageLocal.getCache('pinia_auth')
//   http
//     .request({
//       url: BASE_URL + url,
//       method: method,
//       headers: {
//         Authorization: localData.token,
//         AuthorizationLoginName: localData.userInfo.loginName
//       },
//       params: prePrecessDate(postForm),
//       responseType: 'blob'
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         exportRaw(fileName, res.data)
//         if (callBack) {
//           callBack(res.data)
//         }
//       } else {
//         openMessageBox('导出失败', 'warning')
//       }
//     })
//     .catch(() => {
//       openMessageBox('导出超时', 'warning')
//     })
//     .finally(() => {
//       if (callBackFinally) {
//         callBackFinally()
//       }
//     })
// }

/**
 *  没经过请求拦截的请求(post、patch)
 * @param {string} url 请求地址 如/admin/log/export
 * @param {object} postForm 参数
 */
// export const request_post = (url, postForm, method, callback, errorCallback, isLocal) => {
//   const auth = useStore('auth')
//   getRequestData(url, postForm, method, isLocal)
//     .then((response) => {
//       // 登录超时
//       if (response.data.code == RESPONSE_CODE.CONFERENCE_TIMEOUT) {
//         auth.logoutAction()
//         return
//       }
//       if (callback) {
//         callback(response)
//       }
//     })
//     .catch((err) => {
//       if (errorCallback) {
//         errorCallback(err)
//       }
//     })
// }

// request 回调
// function getRequestData(url, data, method, isLocal) {
//   let newUrl = ''
//   isLocal ? (newUrl = VOICE_URL) : (newUrl = BASE_URL)
//   console.log(newUrl)
//   const localData = storageLocal.getCache('pinia_auth')
//   return http.request({
//     url: newUrl + url,
//     method: method,
//     headers: {
//       Authorization: localData.token,
//       AuthorizationLoginName: localData.userInfo.loginName
//     },
//     data: data
//   })
// }

// 将文本内容生成一个带链接的blob，然后伪装点击链接以下载文件
// const exportRaw = (name, data) => {
//   var urlObject = window.URL || window.webkitURL || window
//   var export_blob = data
//   var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
//   save_link.href = urlObject.createObjectURL(export_blob)
//   save_link.download = name
//   fakeClick(save_link)
// }

// const fakeClick = (obj) => {
//   var ev = document.createEvent('MouseEvents')
//   ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
//   obj.dispatchEvent(ev)
// }

/**
 *  重构 符合 封装select组件 的options
 * @param {array} arr 目标数组
 * @param {string} keyName 目标数组
 * @param {string} valName 目标数组
 * @returns {array} 重钩后
 */
export const restructureOptions = (arr, keyName, valName) => {
  let newArr = []
  if (arr) {
    newArr = arr.map((item) => {
      return { key: item[keyName], value: item[valName] }
    })
  }
  return newArr
}

/**
 *  判断非空 true不为空
 * @param {any} arr 目标值，可以是对象、数组、字符串、undefined、null
 * @returns {boolean} 判断结果
 */
export const checkNotNull = (val) => {
  let empty = true
  if (Array.isArray(val)) {
    //数组
    if (val.length == 0) {
      empty = false
    }
  } else if (val instanceof Object) {
    //对象
    if (JSON.stringify(val) == '{}') {
      empty = false
    }
  } else {
    if (val == '' || val == undefined || val == null) {
      empty = false
    }
  }
  return empty
}

/**
 *  放回音频播放地址
 * @returns {string} 拼接后
 */
export const getAudioUrl = (path) => {
  return BASE_URL + '/audio' + path
}

/**
 *  返回请求头(无端口号) 如http：//192.168.0.166：
 * @returns {string} 拼接后
 */
export const getRequestHead = () => {
  let index = BASE_URL.lastIndexOf(':')
  return BASE_URL.substring(0, index + 1)
}

/**
 *  返回请求头(仅仅ip地址) 如192.168.0.166：
 * @returns {string} 拼接后
 */
export const getIPHead = () => {
  let indexStart = BASE_URL.indexOf('/')
  let indexEnd = BASE_URL.lastIndexOf(':')
  return BASE_URL.substring(indexStart + 2, indexEnd)
}

/**
 *  如http://192.168.0.75:3333/#/login，返回 ＃之后的文字
 * @returns {string} 转化后
 */
export const getHref = () => {
  return document.location.href.split('#')[0] + '#'
}

export const getHrefAfter = () => {
  return document.location.href.substring(document.location.href.indexOf('/#/') + 2)
}

/**
 *  放回上传地址
 * @returns {string} 拼接后
 */
export const getUploadUrl = () => {
  return BASE_URL + '/recordAttachment'
}

/**
 *  提取转写后的文本 为富文本可用的
 * @returns {string} 拼接后
 */
export const changeText = (val) => {
  let text = ''
  if (val) {
    try {
      let content = JSON.parse(val)
      content.forEach((item) => {
        text += `<p class="trans-text" name="${item.beginTime + '-' + item.endTime}">${item.text}</p>`
      })
    } catch (error) {
      text = val
    }
  }
  return text
}
// 单纯文本
export const changeTextB = (arr) => {
  let text = ''
  arr.forEach((item) => {
    text += `<p class="trans-text" name="${item.beginTime + '-' + item.endTime}">${item.role}:${item.txt}</p>`
  })
  return text
}

// 单纯文本-用于富文本分段
export const changeTextC = (arr) => {
  var str = ''
  let role = ''
  arr.forEach((item) => {
    str += item.txt
    role = item.role
  })

  var newStr = ''
  var step = 200
  var remainder = str.length % step //对字符串的长度取行的余数
  var line = (str.length - remainder) / step //截完一共多少行（如果余数大于1，则共有n+1行

  for (var i = 0; i < line; i++) {
    newStr += `<p class="trans-text" name="">${role}:` + str.slice(i * step, (i + 1) * step) + `</p>`
  }

  if (remainder > 0) {
    newStr += `<p class="trans-text" name="">${role}:` + str.slice(line * step) + `</p>`
  }
  return newStr
}

// 单纯文本-用于富文本分段
export const changeTextD = (str, role) => {
  var newStr = ''
  var step = 200
  var remainder = str.length % step //对字符串的长度取行的余数
  var line = (str.length - remainder) / step //截完一共多少行（如果余数大于1，则共有n+1行

  for (var i = 0; i < line; i++) {
    newStr += `<p class="trans-text" name="">${role}:` + str.slice(i * step, (i + 1) * step) + `</p>`
  }

  if (remainder > 0) {
    newStr += `<p class="trans-text" name="">${role}:` + str.slice(line * step) + `</p>`
  }
  return newStr
}

/**
 *  将整数转换成 时：分：秒的格式
 * @returns {string} 转换后
 */
export const realFormatSecond = (second) => {
  var secondType = typeof second
  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}

/**
 * 文件大小 字节转换单位
 * size接受为B，1024KB=1B
 * @param size
 * @returns {string|*}
 */
export const filterSize = (size) => {
  if (!size) return ''
  if (size < pow1024(1)) return size + ' B'
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB'
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB'
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB'
  return (size / pow1024(4)).toFixed(2) + ' TB'
}

// 求次幂
function pow1024(num) {
  return Math.pow(1024, num)
}

/**
 * 毫秒转成 时-分-秒 格式
 * size接受为B，1024KB=1B
 * @param size
 * @returns {string|*}
 */
export const timeLengthFormat = (data, type) => {
  var s
  var hours = parseInt((data % (60 * 60 * 24)) / (60 * 60))
  var minutes = parseInt((data % (60 * 60)) / 60)
  var seconds = data % 60
  switch (type) {
    case 'hour':
      s = (hours > 0 ? hours + '时' : '') + minutes + '分'
      break
    case 'count':
      s = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
      break
    default:
      s = (hours > 0 ? hours + '时' : '') + (minutes > 0 ? minutes + '分' : '') + seconds + '秒'
      break
  }
  return s
}

/**
 * 毫秒转成 年-月-日 格式
 * size接受为B，1024KB=1B
 * @param {string} str 毫秒值
 * @returns {string|*}
 */
export const speTimeFormat = (str, type = 'date') => {
  // 年
  var year = new Date(str).getFullYear()
  // 月
  var month = new Date(str).getMonth() + 1 > 9 ? new Date(str).getMonth() + 1 : '0' + (new Date(str).getMonth() + 1)
  // 日
  var date = new Date(str).getDate() > 9 ? new Date(str).getDate() : '0' + new Date(str).getDate()
  // 时
  var hour = new Date(str).getHours()
  // 分
  var minutes = new Date(str).getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  // 秒
  var seconds = new Date(str).getSeconds()
  if (seconds < 10) {
    seconds = '0' + seconds
  }

  return type === 'date' ? `${year}-${month}-${date} ${hour}:${minutes}:${seconds}` : `${year}-${month}-${date}`
}

/**
 *  合并，当对象数据需要重另一个对象中提取时 赋值相同部分 如 旧对象{name:''}；新对象{name:'123',age:5} => 只更新{name:'123'}
 * @param {object} target 目标对象
 * @param {object} source 数据源
 * @returns {object} 赋值后
 */
export const identicalAssignment = (target, source) => {
  Object.keys(target).forEach((key) => {
    target[key] = source[key] ? source[key] : ''
  })
  return target
}

/**
 *  跳转页面->打印
 * @param {string} content 目标对象
 */
export const printHtml = (content) => {
  window.document.body.innerHTML = content
  window.document.close()
  window.print()
  window.location.reload()
}

/**
 *  以中英文逗号为分隔符，分割字符串，分割结果得到一个数组
 * @param {string} content 目标对象
 */
export const foo = (str) => {
  // var temp = str.split(/[\n\s+,]/g)
  var temp = str.split(/,|，|\s+/)
  var arr = temp.filter((item) => {
    return item != '' && item != undefined
  })
  return arr
}

/**
 *  将typeId转为中文[死数据]
 * @param {Array} arr 目标数组
 * @param {String} name   数组对象中的那个属性
 * @param {Array} option 对应的死数据中的哪个选项
 */
export const transformationId = (arr, name, option) => {
  let newArr = arr.map((item) => {
    let check = option.find((it) => it.value == item[name])
    return Object.assign(item, { [name]: check.key })
  })
  return newArr
}

/**
 *  将typeId转为中文[动态数据]
 * @param {object} data 目标对象|数组
 * @param {string}name   对象中的哪个属性
 * @param {Array}option 需要查找的数据源（选项）
 * @param {string}optionName 查找的数据源（选项），找的哪个字段
 * @param {string}optionVal 查找的数据源（选项），找的哪个字段（真正需要的
 * 如 transformationIdB(newDetail, 'recordType', dictTypes['recordType'],'id','name')
 */
export const transformationIdB = (data, name, option, optionName, optionVal) => {
  // let key = ''
  let findVal = {}
  // 数组
  if (data.constructor().length === 0) {
    data.forEach((item, index) => {
      findVal = option.find((it) => it[optionName] == item[name])
      if (findVal) {
        data[index][name] = findVal[optionVal]
        return
      }
    })
  } else {
    // 对象
    for (let item in data) {
      if (item === name) {
        // key = item
        findVal = option.find((it) => it[optionName] == data[item])[optionVal]
        if (findVal) {
          data[item] = findVal[optionVal]
          return
        }
      }
    }
  }
}

/**
 * @desc 函数防抖
 * @param fn 函数
 * @param timerDelay 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(fn, timerDelay, immediate) {
  let timer
  return function () {
    let that = this
    let args = arguments

    if (timer) clearTimeout(timer)
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, timerDelay)
      if (callNow) fn.apply(that, args)
    } else {
      timer = setTimeout(function () {
        fn.apply(that, args)
      }, timerDelay)
    }
  }
}

/**
 * @desc 数组元素互换位置
 * @param arr 目标数组
 * @param index1
 * @param index2
 */
export const swapArray = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

/**
 * 随机生成字符串
 * @param len 指定生成字符串长度
 */
export const getRandomString = (len) => {
  let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
    min = 0,
    max = _charStr.length - 1,
    _str = '' //定义随机字符串 变量
  //判断是否指定长度，否则默认长度为15
  len = len || 15
  //循环生成字符串
  for (var i = 0, index; i < len; i++) {
    index = (function (randomIndexFunc, i) {
      return randomIndexFunc(min, max, i, randomIndexFunc)
    })(function (min, max, i, _self) {
      let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
        numStart = _charStr.length - 10
      if (i == 0 && indexTemp >= numStart) {
        indexTemp = _self(min, max, i, _self)
      }
      return indexTemp
    }, i)
    _str += _charStr[index]
  }
  return _str
}

/**
 * @desc 替换空格  将所有的值中，空格替换为空串
 * @param obj 目标对象
 */
export const replaceBlank = (obj) => {
  for (let item in obj) {
    if (obj[item]) {
      obj[item] = obj[item].replace(/\s/g, '')
    } else {
      obj[item] = ''
    }
  }
}

// 替换空格 2
export const replaceBlank2 = (obj) => {
  for (let item in obj) {
    obj[item] = obj[item].replace(/\s+/g, '')
  }
}

/**
 * @desc 转换秒数为时分秒格式并输出
 * @param t 秒数
 * @returns {object} 如{01:30:59}
 */
export const formatSeconds = (t) => {
  let nowH = parseInt(t / 3600),
    nowM = parseInt((t % 3600) / 60),
    nowS = parseInt(t % 60)
  nowH = nowH < 10 ? '0' + nowH : nowH
  nowM = nowM < 10 ? '0' + nowM : nowM
  nowS = nowS < 10 ? '0' + nowS : nowS
  return { nowH: nowH, nowM: nowM, nowS: nowS }
}

/**
 * @desc 根据分辨率计算高度
 * @param height 高度
 * @returns {number} newHeight 计算后的高度
 */
export const selfAdaption = (height) => {
  // 网页可见区域高：
  let cWidth = document.body.clientHeight
  let standard = 937
  let newHeight = (cWidth / standard) * height
  if (cWidth == 625) {
    newHeight -= 60
  }
  return newHeight
}

/**
 * @desc 计算当前视口下的列宽
 * @param width 宽
 * @returns {number} newWidth 计算后的列宽
 */
export const calcColWidth = (width) => {
  let standard = 1440 //以1440尺寸为基准
  let clientWidth = document.body.clientWidth
  // 当前环境
  // const environment = window.navigator.userAgent.toLowerCase()
  // 是否edg浏览器（该浏览器多余出部分宽高）
  // if (environment.match(/edg/i) == 'edg') {
  //   standard -= 57
  // }
  // 乘积保留1位小数（不四舍五入）
  let product = Math.floor((clientWidth / standard) * 10) / 10
  return product * width
}

/**
 * @desc 提示框
 * @param msg 提示内容
 * @param btnName 关闭弹窗的按钮名
 * @param title 关闭弹窗的按钮名 确定取消|是否
 * @param type 提示框图标类型(error,success,warning)
 * @returns {number} newHeight 计算后的高度
 */
export function confirmBox(msg, btnName, title, type) {
  let confirmName = btnName == '确定' ? '确定' : '是'
  let cancelsName = btnName == '确定' ? '取消' : '否'
  return ElMessageBox.confirm(msg, title, {
    type: type,
    confirmButtonText: confirmName,
    cancelButtonText: cancelsName,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    dangerouslyUseHTMLString: true
  })
}

/**
 * @desc 复制到剪切板
 * @param newPwd 复制的内容
 * @returns *
 */
export function copyText(text) {
  var input = document.createElement('input') // 直接构建input
  input.value = text // 设置内容
  document.body.appendChild(input) // 添加临时实例
  input.select() // 选择实例内容
  document.execCommand('Copy') // 执行复制
  document.body.removeChild(input) // 删除临时实例
}

/**
 * @desc 校验text是否以 某个字符串为开头
 * @param text 被校验的内容
 * @returns {boolean}
 */
export const checkStart = (text, rules) => {
  let reg = new RegExp('^' + rules)
  return reg.test(text)
}

/**
 * @desc 判断权限
 * @param permCode 权限code
 * @returns {boolean}
 */
export const checkPerm = (permCode) => {
  let permCodeList = sessionStorage.getItem('permCode').split(',')
  if (Array.isArray(permCode)) {
    //1.将两个数组都转换为set集合类型
    let newA = new Set(permCodeList)
    let newB = new Set(permCode)
    //2 利用has()和filter()函数获取两个集合的交集
    let intersectionSet = new Set([...newA].filter((x) => newB.has(x)))
    //3：利用Array.from方法将集合转为数组类型
    let arr = Array.from(intersectionSet)
    //4：判断交集数组是否为空数组
    if (arr == []) {
      return false
    } else if (arr.length > 0) {
      // console.log(permCodeList)
      return true
    }
  } else {
    return permCodeList.indexOf(permCode) > -1 ? true : false
  }
}
