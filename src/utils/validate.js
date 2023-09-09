//  验证控件 规则
export const rule = {}

// 6位纯数字
rule.lastSix = function (value) {
  let reg = /^\d{6}$/
  return reg.test(value)
}

// 再次
rule.passwordAgain = function (value) {
  let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(value)
}

// 直播流地址
rule.validNumber = (rule, value, callback) => {
  let pattern = /^rtsp:\/\// //正则-以"rtsp://"开头的地址
  let notCHN = /[\u4e00-\u9fa5]/ //正则-非中文
  // value = value.replace(/\s/g, '')
  if (value) {
    if (!pattern.test(value)) {
      callback(new Error('直播流地址格式错误'))
    } else if (notCHN.test(value)) {
      callback(new Error('地址不能输入汉字'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**人名
 * 1.可以是中文
   2.可以是英文(允许英文中 点)，允许输入空格
       3.中文和英文不能同时出现
       4.长度在50个字符以内
 * @param name
 * @return
*/
rule.validNameVal = (rule, value, callback) => {
  var reg = /^([\u4e00-\u9fa5]*|[a-zA-Z_.\s]*)$/
  if (value.length > 50) {
    callback(new Error('长度在1-50位字符'))
  } else {
    if (reg.test(value) === false) {
      callback(new Error('姓名格式错误'))
    } else {
      callback()
    }
  }
}

// 1-10000数字
rule.validMaxNumber = (rule, value, callback) => {
  let num = Number(value)
  if (!isNaN(num)) {
    num > 10000 ? callback(new Error('次数范围在1-10000内')) : callback()
  } else {
    callback(new Error('请输入阿拉伯数字'))
  }
}

// 非中文
export const validAccount = (rule, value, callback) => {
  // let notCHN = /[\u4e00-\u9fa5]/ //正则-非中文
  let notCHN = /^\w+$/ //
  console.log(notCHN.test(value))
  if (value) {
    if (notCHN.test(value)) {
      callback(new Error('不能输入中文'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 非中文
export const validCHN = (rule, value, callback) => {
  let notCHN = /[\u4e00-\u9fa5]/ //正则-非中文
  if (value) {
    if (notCHN.test(value)) {
      callback(new Error('不能输入中文'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 邮箱规则
export const validEmail = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('邮箱格式错误'))
    } else if (value.length > 50) {
      callback(new Error('邮箱格式错误'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// ----------------------------------------------------
// 非空
const nonEmpty = [{ required: true, message: '输入值不能为空！' }]
// 手机号
export const validPhone = [
  {
    pattern: /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/,
    message: '手机格式错误',
    trigger: 'blur'
  }
]
// 登录名
export const loginNameLen12 = [
  { required: true, message: '请输入登录名' },
  { pattern: /^.{4,12}$/, message: '请填写4-12个字符' },
  { pattern: /^\w+$/, message: '请输入数字、字母、下划线的一种或组合' }
]
export const loginNameLen16 = [
  { required: true, message: '请输入密码' },
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  // { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/, message: '请输入数字、字母、特殊字符的组合' }
  {
    pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/,
    message: '请输入数字、大写字母、小写字母、特殊字符中至少3种'
  }
]
export const loginNameLenOld16 = [
  { required: true, message: '请输入旧密码' },
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  // { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/, message: '请输入数字、字母、特殊字符的组合' }
  {
    pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/,
    message: '请输入数字、大写字母、小写字母、特殊字符中至少3种'
  }
]
export const loginNameLenNew16 = [
  { required: true, message: '请输入新密码' },
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  // { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/, message: '请输入数字、字母、特殊字符的组合' }
  {
    pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/,
    message: '请输入数字、大写字母、小写字母、特殊字符中至少3种'
  }
]
// 密码允许非必填
export const passwordNotMandatory = [
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  {
    pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$/,
    message: '请输入数字、大写字母、小写字母、特殊字符中至少3种'
  }
]

const verifyAnswer = [{ required: true, message: '请输入问题答案' }]
const verifyAnswerCode = [{ required: true, message: '请选择一个问题' }]
const fixPassword = [
  { required: true, message: '请输入新密码' },
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  { validator: validCHN, trigger: 'change' }
]
const fixPasswordAgain = [
  { required: true, message: '请确认新密码' },
  { pattern: /^.{8,16}$/, message: '请填写8-16个字符' },
  { validator: validCHN, trigger: 'change' }
]

// --------------------------------------------

rule.validateEmail = [{ validator: rule.emailRule, message: '请输入正确的邮箱格式', trigger: 'blur' }]
rule.name = nonEmpty
// -------------------------------------------

// 标准笔录-简单版本
export const simpleRules = {
  recordType: [{ required: true, message: '请选择笔录类型' }],
  caseName: [
    { required: true, message: '请输入案件名称' },
    { pattern: /^.{1,100}$/, message: '案件名称长度在1-100位字符' }
  ],
  interrogators: [{ required: true, message: '请选择审讯人' }],
  recordUser: [{ required: true, message: '请选择记录人' }],
  caseCode: [
    { required: true, message: '请输入案件编号' },
    { pattern: /^.{1,100}$/, message: '案件编号长度在1-100位字符' }
  ],
  name: [
    { required: true, message: '请输入涉案人名称' },
    { pattern: /^.{1,10}$/, message: '涉案人名称长度在1-10位字符' }
  ],
  roomId: [{ required: true, message: '请选择房间' }],
  roomName: [{ pattern: /^.{0,100}$/, message: '问话地点长度在0-100位字符' }]
}

// 标准笔录-高级版本
export const premiuRules = {
  caseType: [{ required: true, message: '请选择案件类型' }],
  certificateCode: [
    { required: true, message: '请输入证件号码' },
    { pattern: /^.{1,50}$/, message: '长度在1-50位字符', trigger: 'blur' }
  ],
  certificateType: [{ required: true, message: '请选择证件类型' }],
  name: [
    { required: true, message: '请输入姓名' },
    { validator: rule.validNameVal, trigger: 'blur' }
  ],
  nickName: [{ pattern: /^.{0,20}$/, message: '长度在0-20位字符' }],
  caseCode: [
    { required: true, message: '请输入案件编号' },
    { pattern: /^.{1,50}$/, message: '长度在1-50位字符' }
  ],
  caseName: [
    { required: true, message: '请输入案件名称' },
    { pattern: /^.{1,40}$/, message: '长度在1-40位字符' }
  ],
  causeAction: [{ required: true, message: '请选择案由类型' }],
  undertakers: [{ required: true, message: '请选择承办人' }],
  underDepartment: [{ required: true, message: '请选择办案部门' }],
  recordDepartment: [{ required: true, message: '请选择办案部门' }],
  recordType: [{ required: true, message: '请选择笔录类型' }],
  personType: [{ required: true, message: '请选择人员类型' }],
  times: [
    { required: true, message: '请输入次数' },
    { validator: rule.validMaxNumber, trigger: 'blur' }
  ],
  interrogators: [{ required: true, message: '请选择审讯人' }],
  recordUser: [{ required: true, message: '请选择记录人' }],
  roomId: [{ required: true, message: '请选择房间' }],
  roomName: [{ pattern: /^.{0,100}$/, message: '长度在0-100位字符' }],
  present: [{ pattern: /^.{0,200}$/, message: '长度在0-200位字符' }],
  domicile: [{ pattern: /^.{0,200}$/, message: '长度在0-200位字符' }],
  phone: validPhone,
  nameUsed: [{ pattern: /^.{0,20}$/, message: '长度在0-20位字符' }],
  workUnit: [{ pattern: /^.{0,200}$/, message: '长度在0-200位字符' }]
}

export const templateRules = {
  name: [
    { required: true, message: '请输入模板名称' },
    { pattern: /^.{1,100}$/, message: '长度在1-100位字符' }
  ],
  recordTypeIds: [{ required: true, message: '请选择笔录类型' }],
  personTypeIds: [{ required: true, message: '请选择涉案人员类型' }]
}

export const keyWordRules = {
  nlpWord: [
    { required: true, message: '请输入关键词' },
    { pattern: /^.{1,20}$/, message: '关键词长度不超过20个字符' }
  ]
}

export const sensitiveRules = {
  word: [
    { required: true, message: '请输入敏感词' },
    { pattern: /^.{1,20}$/, message: '敏感词长度不超过20个字符' }
  ],
  replace: [
    { required: true, message: '请输入替换词' },
    { pattern: /^.{1,20}$/, message: '替换词长度不超过20个字符' }
  ]
}
export const moodKeyRules = {
  nlpWord: [
    { required: true, message: '请输入语气词' },
    { pattern: /^.{1,50}$/, message: '语气词长度不超过50个字符' }
  ]
}

export const addDepartmentRules = {
  depName: [
    { required: true, message: '请输入部门名称' },
    { pattern: /^.{1,50}$/, message: '长度不能超过50个字' }
  ],
  comName: [
    { required: true, message: '请输入单位名称' },
    { pattern: /^.{1,50}$/, message: '长度不能超过50个字' }
  ],
  comId: [{ required: true, message: '请选择单位' }]
}

export const audioEditRules = {
  fileName: [
    { required: true, message: '请输入音频文件名称' },
    { pattern: /^.{1,100}$/, message: '音频文件名称在1-100位字符' }
  ]
}

export const answerRules = {
  asks: [{ pattern: /^.{0,10}$/, message: '句子长度在0-50位字符' }],
  answers: [{ pattern: /^.{0,50}$/, message: '句子长度在0-50位字符' }]
}

export const roleRules = {
  roleName: [
    { required: true, message: '请输入角色名称' },
    { pattern: /^.{1,20}$/, message: '角色名称长度在1到20个字符' }
  ]
}

// ------------------------------------------------以上有些许未使用的定义
export const roleDialogRules = {
  roleId: [{ required: true, message: '请选择一个角色' }]
}

export const verifyDialogRules = {
  password: [{ required: true, message: '请输入您的密码' }]
}

export const userDialogRules = {
  userName: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { pattern: /^.{2,20}$/, message: '请填写2-20个字符', trigger: 'blur' }
  ],
  depId: [{ required: true, message: '请选择一个部门', trigger: 'change' }],
  comId: [{ required: true, message: '请选择一个单位', trigger: 'change' }],
  telephone: validPhone,
  loginName: loginNameLen12,
  password: loginNameLen16,
  email: [{ validator: validEmail, trigger: 'blur' }],
  passwordMine: [{ required: true, message: '请输入您的密码' }]
}

export const userDialogRulesLoginName = loginNameLen12
export const userDialogRulesPaw = loginNameLen16

export const systemRules = {
  systemName: [
    { required: true, message: '请输入系统名称' },
    { pattern: /^.{1,20}$/, message: '系统名称长度不能超过20个字' }
  ],
  systemSupport: [{ pattern: /^.{0,20}$/, message: '技术支持长度不能超过20个字' }]
}

export const personalityRules = {
  words: [
    { required: true, message: '请输入个性词/多词用逗号分隔' },
    { pattern: /^.{1,50}$/, message: '个性词长度在1到50个字符' }
  ]
}

export const customRules = {
  password: [
    { required: true, message: '请输入密码' },
    { pattern: /^.{1,8}$/, message: '密码长度在1-8位' },
    { validator: validCHN, trigger: 'change' }
  ]
}

export const forgetRules = {
  loginName: loginNameLen12,
  oldPassword: nonEmpty,
  newPassword: nonEmpty,
  password: fixPassword,
  confirePassword: fixPasswordAgain
}

// 仅登录页
export const loginRulesSimple = {
  loginName: loginNameLen12,
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

export const loginRules = {
  loginName: loginNameLen12,
  password: loginNameLen16
}

export const questionRules = {
  question: nonEmpty,
  answer: verifyAnswer,
  answerCode: verifyAnswerCode
}

export const configRules = {
  roomName: [
    { required: true, message: '请输入房间名称' },
    { pattern: /^.{1,100}$/, message: '房间名称需设置为1-100个字符' }
  ],
  rtspUrl: [
    // { required: true, message: '请输入视频地址' },
    { pattern: /^.{1,200}$/, message: '直播流地址需设置为最大200个字符' },
    { validator: rule.validNumber, trigger: 'blur' }
  ]
}

export const voiceRules = {
  userId: [{ required: true, message: '请选择一个人员', trigger: 'blur' }]
}

export const renameRules = {
  summaryName: [{ required: true, message: '请输入会议纪要模板名称' }]
}

export const audioDialogRules = {
  name: [{ required: true, message: '请输入会议名称' }],
  file: [{ required: true, message: '请上传附件' }]
}

export const actualDialogRules = {
  name: [{ required: true, message: '请输入会议名称' }],
  room: [{ required: true, message: '请上传附件' }]
}
