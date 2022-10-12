/*
 * @Author: your name
 * @Date: 2020-04-10 16:31:02
 * @LastEditTime: 2022-07-06 16:49:26
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: \chrome-extension-webpack\src\content\index.js
 */
import Vue from 'vue'
import App from './App.vue'
import Shadow from './shadow.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 加载Element-ui字体文件
const elementIcons = document.createElement('style')
elementIcons.type = 'text/css'
elementIcons.textContent = `
    @font-face {
        font-family: "element-icons";
        src: url('${chrome.runtime.getURL('fonts/element-icons.woff')}') format('woff'),
        url('${chrome.runtime.getURL('fonts/element-icons.ttf')}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    }
`
document.head.appendChild(elementIcons)

const app = new Vue({
  render: (h) => h(App)
}).$mount()

new Shadow({
  app: app,
  name: 'chrome-extension'
}).mount('body')
