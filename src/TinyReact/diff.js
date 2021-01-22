import mountElement from './mountElement'

/**
 * diff 方法 比对 virtualDOM 和 真实DOM 的区别
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 * @param oldDOM 旧的DOM
 */
export default function diff(virtualDOM, container, oldDOM) {
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
  }
}
