import axios from 'axios'
import Cookie from 'js-cookie'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// import { getToken } from '@/utils/auth'
axios.defaults.headers['Content-Type'] =
  'application/x-www-form-urlencoded;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_SERVER,
  // aa:1,
  // 超时
  timeout: 10000,
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    config._t = Date.parse(new Date()) / 1000
    if (config.method == 'get') {
      config.url = config.url + '?' + Date.parse(new Date()) / 1000
    }
    if (config.selfTime) {
      config.timeout = config.selfTime
    }
    config.headers['Authorization'] = Cookie.get('token')
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const code = res.data.code
    if (res.headers['token']) {
      // sessionStorage.setItem('token', res.headers['token'])
      Cookie.set('token', res.headers['token'])
    }
    if (code == 200) {
      return res.data
    } else {
      if (code === 120700 || code === 120701) {
        // sessionStorage.removeItem('token');
        var keys = document.cookie.match(/[^ =;]+(?==)/g)
        if (keys) {
          for (var i = keys.length; i--; ) {
            document.cookie =
              keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
          }
        }
        window.location.href = '/#/'

        return
      }
      if (code === 401) {
        MessageBox.confirm(
          '登录状态已过期，您可以继续留在该页面，或者重新登录',
          '系统提示',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        // Message(res.data.message)
        return res.data
      }
    }
  },
  (error) => {
    console.log('err' + error)
    if (error.message != sessionStorage.getItem('errorMessage')) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000,
        onClose: function () {
          sessionStorage.removeItem('errorMessage')
        },
      })
      sessionStorage.setItem('errorMessage', error.message)
    } else {
    }
    return Promise.reject(error)
  }
)

export default service
