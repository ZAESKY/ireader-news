// 请求模块
import store from '@/store'
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 发起请求会经过这里
  // config：本次请求的配置对象
  if (user && user.data.token) {
    config.headers.Authorization = `Bearer ${user.data.token}`
  }
  // 务必要返回请求对象
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request