import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情

    if (store.getters.token) {
      // 让每个请求都带有令牌
      // ['X-Token'] 是自定义标题键
      // 请根据实际情况进行修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 做一些请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取http信息（例如标题或状态）
   * 请返回  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过http状态代码来判断状态
   */
  response => {
    const res = response.data

    // 如果code不等于200则是错误
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

<<<<<<< HEAD
<<<<<<< HEAD
      // 50008：非法令牌； 50012：其他客户端登录； 50014：令牌已过期；
      /* if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('您已经注销，可以取消停留在此页面上，或者再次登录', '确认登出', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } */
=======
=======
>>>>>>> master
      // // 50008：非法令牌； 50012：其他客户端登录； 50014：令牌已过期；
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // 重新登录
      //   MessageBox.confirm('您已经注销，可以取消停留在此页面上，或者再次登录', '确认登出', {
      //     confirmButtonText: '重新登入',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
<<<<<<< HEAD
>>>>>>> eba13d4... update system user
=======
>>>>>>> master
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
