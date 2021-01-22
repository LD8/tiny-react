import diff from './diff'

/**
 * render 方法将 virtualDOM 转换为 真实DOM
 * 开放给框架的使用者调用
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 * @param oldDOM 旧的DOM
 */
export default function render(virtualDOM, container) {
  // 在 diff 方法内部判断是否需要对比 对比也好 不对比也好 都在 diff 方法中进行操作
  const oldDOM = null
  diff(virtualDOM, container, oldDOM)
}
