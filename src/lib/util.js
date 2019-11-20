import Cookies from 'js-cookie'
import clonedeep from 'clonedeep'
import { objEqual } from './tools'
export const setTitle = title => {
  window.document.title = title || 'admin'
}

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

// 将文件放入文件夹
export const putFileInFolder = (folderList, fileList) => {
  // 引用类型 所以用深拷贝
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  // 用map 返回一个新数组
  return folderListCloned.map(folderItem => {
    const folderId = folderItem.id
    // 从文件列表最后一位删起 不影响下标
    let index = fileListCloned.length
    while (--index) {
      const fileItem = fileListCloned[index]
      if(fileItem.folder_id === folderId){
        // splice 返回删除的元素
        const file = fileListCloned.splice(index, 1)[0]
        file.title = file.name
        // 判断是否有children
        if(folderItem.children) folderItem.children.push(file)
        else folderItem.children = [file]
      }
    }
    // 样式设置
    folderItem.type = 'folder'
    return folderItem
  })
}

// 递归循环文件 嵌套文件
export const transferFolderToTree = folderList => {
  
  if(!folderList.length) return []
  const folderListCloned = clonedeep(folderList)
  // 根据文件id匹配 子文件
  const handle = (id) => {
    let arr = []
    folderListCloned.forEach(folder => {
      if(folder.folder_id === id){
        // 递归调用
        const children = handle(folder.id)
        if(folder.children){
          folder.children = [].concat(folder.children, children)
          folder.title = folder.name
        }else {
          folder.children = children
          folder.title = folder.name
        }
        arr.push(folder)
      }
    });
    return arr
  }
  // 第一默认id是0
  return handle(0)
}

/**
 * 展开指定的节点
 */
export const expandSpecifiedFolder = (folderTree, id) => {
  return folderTree.map(item => {
    if (item.type === 'folder') {
      if (item.id === id) {
        item.expand = true
      } else {
        if (item.children && item.children.length) {
          item.children = expandSpecifiedFolder(item.children, id)
          if (item.children.some(child => {
            return child.expand === true
          })) {
            item.expand = true
          } else {
            item.expand = false
          }
        }
      }
    }
    return item
  })
}

export const file = (fileName) => {
  return import(`@/views/${fileName}`)
}

export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 路由是否存在
 */
export const routeHasExist = (tabList, rouleItem) => {
  let res = false
  tabList.forEach((element) => {
    // console.log(routeEqual(element, rouleItem))
    if(routeEqual(element, rouleItem)) res = true
  })
  
  return res
}

/**
 * {a:1}  => ['a','1']
 * 对象转字符串数组 
 * entries()  对象转二维数组
 * sort() 排序
 */
const getKyeValueArr = obj => {
  let arr = []
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([ _key, _val ])=>{
    // console.log(_key,_val)
    arr.push(_key,_val)
  })
  // console.log(arr)
  return arr
}


/**
 * 
 * @param {路由对象} route
 * 路由对象实例拼接成字符串
 * argu:id_111_age_122&a_111_b_222
 */
export const getTabNameByRoute = route => {
  const { name, params, query} = route
  let res = name
  if(params && Object.keys(params).length) res += ':' + getKyeValueArr(params).join('_')
  if(query && Object.keys(query).length) res += '&' + getKyeValueArr(query).join('_')
  return res
}

const getObjBySplitStr = (id, splitStr) => {
  let splitArr = id.split(splitStr)
  let str = splitArr[splitArr.length - 1]
  let keyValArr = str.split('_')
  let res = {}
  let i = 0
  let len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i+1]
    i += 2
  }
  return res
}

/**
 * id转对象
 * @param {对象转变后的id} id 
 */
export const getRouteById = id => {
  // console.log(id)
  let res = {}
  if (id.includes('&')) {
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  if (id.includes(':')) {
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res
}

/**
 * 返回展开的Submenu 的name 集合
 * @param {选中路由} name 
 * @param {路由列表} routerList 
 */
export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {
    if(item.name === name){
      arr.push(item.name)
      return true
    }
    if(item.children && item.children.length){
      let childArr = getOpenArrByName(name, item.children)
      arr = arr.concat(item.name, childArr)
      return true
    }
  })
  return arr
}

/**
 * 设置浏览器缓存
 * @param {名称} name 
 * @param {值} value 
 */
export const localSave = (name, value) => {
  localStorage.setItem(name, value)
}

/**
 * 读取浏览器缓存
 * @param {读取名称} name 
 */
export const localRead =(name) => {
  return localStorage.getItem(name)
}

/**
 * 模拟form表单请求 下载文件
 * @param {提交地址, 提交参数} param0 
 */
export const downloadFile = ({ url, params }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}