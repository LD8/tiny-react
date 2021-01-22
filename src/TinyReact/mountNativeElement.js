import createDOMElement from './createDOMElement'

/**
 * mountNativeElement 方法 挂载 原生DOM元素
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 */
export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM)
  // 将转换之后的DOM对象挂载到页面中
  container.appendChild(newElement)
}
