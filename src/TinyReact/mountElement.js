import mountNativeElement from './mountNativeElement'

/**
 * mountElement 方法
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 */
export default function mountElement(virtualDOM, container) {
  // Component VS NativeElement(普通的 DOM 元素)
  // 通过调用 mountNativeElement 方法转换 Native Element
  mountNativeElement(virtualDOM, container)
}
