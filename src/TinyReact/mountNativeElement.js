import mountElement from './mountElement'

/**
 * mountNativeElement 方法
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 */
export default function mountNativeElement(virtualDOM, container) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 是文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
  }
  // 递归创建子节点
  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })

  // 将转换之后的DOM对象挂载到页面中
  container.appendChild(newElement)
}
