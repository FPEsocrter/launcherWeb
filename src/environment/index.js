let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://121.4.69.84:8080'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://192.168.12.162:20016'
} else {
  BASE_URL = '/'
}
console.log(BASE_URL)

export { BASE_URL, TIME_OUT }
