import Mock from 'mockjs'
import { getUserInfo, authoriztion } from './response/user'
import { getTableData, getFolderList, getFileList } from './response/data'
const Random = Mock.Random
// 地址 方式 拦截方法
// Mock.mock(/\/getUserInfo/, 'post', getUserInfo)
Mock.mock(/\/getTableData/, 'get', getTableData)
Mock.mock(/\/getFolderList/, 'get', getFolderList)
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/authorization/, 'get', authoriztion)

// 响应时间
Mock.setup({
  timeout: 0
})
// 自定义扩展
Random.extend({
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

export default Mock
