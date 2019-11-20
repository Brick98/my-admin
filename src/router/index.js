import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import { setTitle, setToken, getToken } from '@/lib/util'
import store from '@/store'
Vue.use(Router)
const router = new Router({
  routes
})
// 是否登录
// const HAS_LOGINED = false
// 全局前置守卫
router.beforeEach((to, form, next) => {
  to.meta && setTitle(to.meta.title)
  // 一、 用变量表示是否登录
  // if (to.name !== 'login') {
  //   if (HAS_LOGINED) next()
  //   else next({ name: 'login' })
  // } else {
  //   if (HAS_LOGINED) next({ name: 'home' })
  //   else next()
  // }
  // -----------------------------------------
  // 二、获取token判断登录
  const token = getToken()

  if (token) {
    // 判断token是否有效
    store
      .dispatch('authoriztion', token)
      .then(() => {
        if (to.name === 'login') next({ name: 'home' })
        else next()
      })
      .catch((err) => {
        console.log(err)
        // token失效
        setToken('')
        next({ name: 'login' })
      })
  } else {
    if (to.name === 'login') next()
    else next({ name: 'login' })
  }

  // -------------------------------------
  // 三、获取token 加 访问权限
  // const token = getToken()
  // if(token){
  //   // console.log(!store.state.router.hasGetRules)
  //   // 判断是否获取权限
  //   if(!store.state.router.hasGetRules){
  //     store.dispatch('authoriztion',token).then(rules => {
  //       // 合并集合
  //       store.dispatch('concatRoutes', rules).then(routers => {
  //         // 动态挂载路由集合到router上
  //         router.addRoutes(routers)
  //         // 替换的形式挂载后跳转
  //         next({...to, replace: true})
  //       }).catch(()=> {
  //         next({ name: 'login' })
  //       })
  //     }).catch(()=> {
  //       setToken('')
  //       next({ name: 'login' })
  //     })
  //   }else {
  //     next()
  //   }
  // } else {
  //   if(to.name === 'login') next()
  //   else next({name:'login'})
  // }
})

// 导航被确认之前
// router.beforeResolve

// 后置钩子
router.afterEach((to, from) => {
  // logining=false
})

export default router
