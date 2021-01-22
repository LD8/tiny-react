import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'
import isFunction from './isFunction'

/**
 * mountElement 方法：挂载 组件/DOM 元素
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 */
export default function mountElement(virtualDOM, container) {
  // Component VS NativeElement(普通的 DOM 元素)
  if(isFunction(virtualDOM)){
    // Component
    mountComponent(virtualDOM, container)
  }else {
    // 通过调用 mountNativeElement 方法转换 Native Element
    mountNativeElement(virtualDOM, container)

  }
}
