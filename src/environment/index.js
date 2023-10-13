// 同步获取请求地址
// let xmlhttp = new XMLHttpRequest()
// xmlhttp.open('get', './webapi.json', false)
// xmlhttp.send(null)
import http from 'axios'
let BASE_URL = ''
const TIME_OUT = 10000

var result
await http.get('./webapi.json').then(async ({ data: res }) => {
  result = res
})

// 开发/生产
if (process.env.NODE_ENV === 'development') {
  BASE_URL = result.DEV_PRODUCTION_URL
  // BASE_URL = JSON.parse(xmlhttp.responseText).DEV_PRODUCTION_URL
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = result.PRODUCTION_URL
} else {
  BASE_URL = '/'
}

export { BASE_URL, TIME_OUT }
