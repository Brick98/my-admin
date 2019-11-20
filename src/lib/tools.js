/**
 * 
 * @param {次数} time 
 * @param {方法} callback 
 * 重复某件数
 */
export const doCustomTimes = (time, callback)=> {
  let i = -1
  while (++i < time) {
    callback(i)
  }
}

/**
 * 判断两个对象的属性名和值相等
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if(keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  // some  有一个元素满足条件就返回true 不往下执行 都不满足就返回false
  else return !keysArr1.some(key => obj1[key] !== obj2[key])
}