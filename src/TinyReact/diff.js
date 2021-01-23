import mountElement from './mountElement'
import updateTextNode from './updateTextNode'
import updateNodeElement from './updateNodeElement'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

/**
 * diff 方法 比对 virtualDOM 和 真实DOM 的区别
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 * @param oldDOM 旧的DOM
 */
export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
  } else if (typeof virtualDOM.type === 'function') {
    // 要更新的是组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 如果 【类型不同】且【类型不是函数】
    // 使用 virtualDOM 替换 真实DOM
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    // 如果【有旧虚拟DOM】 且【类型相同】
    if (virtualDOM.type === 'text') {
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    virtualDOM.children.forEach((child, i) => {
      diff(child, oldDOM, oldDOM.childNodes[i])
    })

    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 如果旧节点的数量多于要渲染的新节点的长度
      for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        // 从后向前删除，直到节点数量相等
        unmountNode(oldChildNodes[i])
      }
    }
  }
}
