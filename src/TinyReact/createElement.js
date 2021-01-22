export default function createElement(type, props, ...children) {
  // 使用 [].concat(...) 方式复制数组
  // const childElements = [].concat(...children).map((child) => {
  //   if (child instanceof Object) {
  //     return child
  //   } else {
  //     return createElement('text', { textContent: child })
  //   }
  // })

  // 使用 [].concat(...) 方式复制数组
  const childElements = [].concat(...children).reduce((result, child) => {
    // 处理 { false && <h1>xxx</h1> } 的情况
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        // 操作 result
        result.push(child)
      } else {
        // 操作 result
        result.push(createElement('text', { textContent: child }))
      }
    }
    // 最终返回 result
    return result
    // reduce() 方法第一个参数为一个回调函数，第二个参数为该回调函数第一个参数 result 的初始值
  }, [])
  return {
    type,
    // 支持通过 props.children 拿到所有子节点
    props: Object.assign({ children: childElements }, props),
    children: childElements,
  }
}
