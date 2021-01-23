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

    // 1. 将拥有key属性的元素放入 keyedElements 对象中
    let keyedElements = {}
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        // 如果这个 DOM 元素为元素节点（不是 text 纯文本节点）
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    if (hasNoKey) {
      virtualDOM.children.forEach((child, i) => {
        diff(child, oldDOM, oldDOM.childNodes[i])
      })
    } else {
      // 2. 循环 virtualDOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, i) => {
        let key = child.props.key
        if (key) {
          let domElement = keyedElements[key]
          if (domElement) {
            // 此DOM存在，不需要重新渲染，但它的位置无法确定
            // 3. 看看当前的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              // 需要给元素窎远位置，插入在当前元素之前
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素，直接挂载
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }
    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 如果旧节点的数量多于要渲染的新节点的长度，则有多余节点需要删除
      if (hasNoKey) {
        // 没有找到带 key 的子元素
        for (let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          // 从后向前删除，直到节点数量相等
          unmountNode(oldChildNodes[i])
        }
      } else {
        // 通过 key 属性删除节点，提高效率
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildeNodes[i]
          let oldChildKey = oldChild._virtualDOM.props.key
          let found = false
          for (let n = 0; n < virtualDOM.children.length; n++) {
            // 通过 key 寻找新老相同节点
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true
              break
            }
            if (!found) {
              // 如果没找到相同节点，则该节点需要被删掉
              unmountNode(oldChild)
            }
          }
        }
      }
    }
  }
}
