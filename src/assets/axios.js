/*
 * @Author: your name
 * @Date: 2020-04-17 09:13:59
 * @LastEditTime: 2022-07-06 14:59:18
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: \chrome-extension-webpack\src\assets\request.js
 */
import axios from 'axios'
import { showMessage } from '../content/js/public'
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    /**
     * 创建实例
     * @type {[type]}
     */
    const instance = axios.create({
      baseURL: process.env.VUE_APP_API,
      timeout: 30000
    })
    /**
     * 请求拦截
     * @type {[type]}
     */
    instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(new Error(error))
      }
    )

    /**
     * 响应拦截
     * @type {[type]}
     */
    instance.interceptors.response.use(
      (response) => {
        const data = response.data.data
        const code = response.data.code
        const message = response.data.message
        if (code === 200) {
          return data
        } else {
          showMessage(message, 'red')
          return new Promise((resolve, reject) => {
            reject(new Error(message))
          })
        }
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    instance(options)
      .then((res) => resolve(res))
      .catch((error) => reject(error))
  })
}
