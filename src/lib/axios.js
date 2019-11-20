import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
// import store from '@/store'
class HttpRequest {
  // 构造
  constructor (baseUrl = baseURL) {
    // baseUrl = baseUrl || baseURL
    // this表示new 的这个实例
    console.log(baseUrl)
    this.baseUrl = baseUrl
    this.queue = {}
  }
  // 全局配置
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  // 拦截器
  interceptors (instance, url) {
    instance.interceptors.request.use(
      config => {
        // console.log(config)
        // 全局的loading
        if (!Object.keys(this.queue).length) {
          // console.log(store)
          // Span.show()
        }
        // 请求时把URL作为属性名存进队列
        this.queue[url] = true
        config.headers['Authorization'] = getToken()
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      res => {
        // 响应时删除队列里的当前请求URL
        delete this.queue[url]
        const { data } = res
        return data
      },
      error => {
        delete this.queue[url]
        return Promise.reject(error.response.data)
      }
    )
  }
  // 请求的配置
  request (options) {
    const instance = axios.create()
    // console.log(options.url)
    options.url= baseURL+options.url
    
    // 合并对象
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
