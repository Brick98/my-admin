import {routes, routerMap} from '@/router/router'
const state = {
  routers:routes,// 过滤后的router集合
  hasGetRules: false // 是否获取过用户权限

}
const mutations = {
  CONCAT_ROUTES(state, routerList) {
    // 合并权限集合和 都可访问的集合（在后面）
    state.routers = routerList.concat(routes)
    state.hasGetRules = true
  }
}
// 过滤方法
const getAccesRouterList = (routes,rules)=> {
  return routes.filter(item => {
    if(rules[item.name]){
      if(item.children){
        item.children = getAccesRouterList(item.children,rules)
      }
      return true
    }else {
      return false
    }
  })
}

const actions ={
  concatRoutes ({commit}, rules){
    return new Promise((resolve, reject) => {
      try {
        let routerList = []
        // 先判断是不是 全部都可以访问
        if(Object.entries(rules).every(item => item[1])){
          routerList = routerMap
        }else {
          // 过滤
          routerList = getAccesRouterList(routerMap, rules)
        }
        // commit修改state的值
        commit('CONCAT_ROUTES',routerList)
        resolve(state.routers)
      } catch (error) {
        reject(error)
      }
    })
  }
}
export default {
  state,
  mutations,
  actions
}