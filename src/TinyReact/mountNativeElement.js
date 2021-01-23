import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

/**
 * mountNativeElement 方法 挂载 原生DOM元素
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 * @param oldDOM 老的 DOM 容器
 */
export default function mountNativeElement(virtualDOM, container, oldDOM) {
  let newElement = createDOMElement(virtualDOM)
  // 判断旧的DOM对象是否存在，如果存在，删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }
  // 将转换之后的DOM对象挂载到页面中
  container.appendChild(newElement)

  let component = virtualDOM.component
  if (component) {
    component.setDOM(newElement)
  }
}
