export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM

  // 1. 文本节点可以直接删除
  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }

  // 2. 元素为组件：调用生命周期函数
  let component = virtualDOM.component
  if (component) {
    component.componentWillUnmount()
  }

  // 3. 删除节点上的 ref
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 4. 节点的属性中是否有事件属性，有的话移除事件
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(0, 2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })

  // 5. 递归删除子节点（同样将所有子节点经过上面这些处理）
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

  // 删除节点
  node.remove()
}
