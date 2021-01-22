import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

/**
 * createDOMElement 方法: 真正的将 虚拟DOM 转换为 真实DOM 的方法
 * @param virtualDOM virtualDOM 对象
 */
export default function createDOMElement(virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 是文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 为元素添加属性
    updateNodeElement(newElement, virtualDOM)
  }
  // 递归创建子节点
  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })
  return newElement
}
