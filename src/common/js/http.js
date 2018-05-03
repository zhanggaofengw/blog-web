/**
 * Created by zgf on 2017/12/21.
 */
import axios from 'axios'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.BASE_URL // 这是调用数据接口
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    // const token = getCookie('session') // 获取Cookie
    config.data = JSON.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    }
    // if (token) {
    //  config.params = {'token': token} // 后台接收的参数，后面我们将说明后台如何接收
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
// response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if (response.data.errCode === 2) {
      let route = {}
      route.push({
        path: '/login',
        query: {redirect: route.currentRoute.fullPath} // 从哪个页面跳转
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  })

export default axios
/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        headers: {
          Accept: '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Host: '192.168.1.6:8888',
          Referer: 'http://192.168.1.6:8888'
        },
        params: params
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
        headers: {
          Accept: '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded',
          Host: '192.168.1.6:8888',
          Referer: 'http://192.168.1.6:8888'
        }
      })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch(err => {
        reject(err)
      })
  })
}


