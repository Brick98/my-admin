import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './lib/bus'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/font/iconfont.js'
import '@/assets/font/iconfont.css'
import IconFont from '_c/icon-font'
import IconSvg from '_c/icon-svg'
// if (process.env.NODE_ENV !== 'production') require('./mock')

Vue.config.productionTip = false
Vue.prototype.$bus = Bus
Vue.component('icon-font', IconFont)
Vue.component('icon-svg', IconSvg)
Vue.use(iview)
const handleClick = event => {
  event.stopPropagation()
  console.log(event)
}

let list = [{ name: 'xz1' }, { name: 'xz2' }]
const getLiEleArr = h => {
  return list.map((item, index) =>
    h(
      'li',
      {
        on: {
          click: handleClick
        },
        key: index
      },
      item.name
    )
  )
}

new Vue({
  router,
  store,
  // render: h => {
  //   // 返回一个虚拟节点 h(标签或组件、属性、（子元素=>字符串或数组）)
  //   return h(
  //     CountTo,
  //     {
  //       // 作为保留字 必须用引号 (三种写法：字符串、数组、对象)
  //       cliass: {
  //         'count-to': true
  //       },
  //       // 设置原生属性
  //       attrs: {
  //         id: 'box'
  //       },
  //       style: {
  //         color: 'pink'
  //       },
  //       domProps: {
  //         // innterHTML: '123'
  //       },
  //       props: {
  //         endVal: 100
  //       },
  //       // 自定义事件
  //       on: {
  //         'on-animation-end': val => {
  //           console.log(val)
  //         }
  //       },
  //       // 原生事件
  //       nativeOn: {
  //         click: () => {
  //           console.log('click')
  //         }
  //       },
  //       // 指令
  //       directives: [],
  //       // 作用域插槽
  //       scopedSlots: {},
  //       slot: '',
  //       key: '',
  //       ref: ''
  //     },
  //     'brick'
  //   )
  // }
  // //循环节点
  // render: h =>
  //   h('div', [
  //     h(
  //       'ul',
  //       {
  //         on: {
  //           click: handleClick
  //         }
  //       },
  //       getLiEleArr(h)
  //     )
  //   ])
  render: h => h(App)
}).$mount('#app')
