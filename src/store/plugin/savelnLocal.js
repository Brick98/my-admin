// 每次store初始化时调用（刷新浏览器第一次做的操作）
export default store => {
  if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  // 每次提交mutation之后都会执行
  store.subscribe((mutation, state) => {
    localStorage.state = JSON.stringify(state)
  })
}
