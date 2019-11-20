import { routeHasExist, getRouteById, routeEqual, localSave, localRead } from '@/lib/util'

const state = {
  // tabList:JSON.parse(localRead('tabList') || '[]')
  tabList:[]
}
// 可存入cookis的字符串
const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  UPDATE_ROUTER (state, route) {
    // 路由是否存在 并且过滤登录 *
    if(!routeHasExist(state.tabList,route) && route.name !== 'login' && !!route.name){
      state.tabList.push(route)
      localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
    }
  },
  REMOVE_TAB (state, index) {
    state.tabList.splice(index,1)
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove ({commit},{id, $route}) {
    return new Promise((resolve) => {
      let route = getRouteById(id)
      // 返回集合元素的下标
      let index = state.tabList.findIndex(item=>{
        return routeEqual(route,item)
      })
      // 关闭路由 跳转前后页面
      let len = state.tabList.length
      let nextRoute = {}
      if(routeEqual($route, state.tabList[index])){
        // 关闭的路由就是当前打开的路由
        if(index < len -1) nextRoute = state.tabList[index + 1]
        else nextRoute = state.tabList[index - 1]
      }
      const { name, params, query } = nextRoute || { name: 'home_index'}
      commit('REMOVE_TAB',index)
      resolve({
        name,params,query
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}