import mountElement from './mountElement'
import updateComponent from './updateComponent'

/**
 * diffComponent
 * @param virtualDOM 组件本身的 virtualDOM 对象
 *                   通过它可以获取到组件最新的 props
 * @param oldComponent 要更新的组件的实例对象
 *                     通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
 * @param oldDOM 要更新的 DOM 对象
 *               在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
 * @param container 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
 */
export default function diffComponent(virtualDOM, oldComponent, oldDOM, container) {
  // 判断要更新的组件和未更新的组件是否是同一个组件 只需要确定两者使用的是否是同一个构造函数就可以了
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 属同一个组件 做组件更新
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是同一个组件 直接将组件内容显示在页面中
    // 这里为 mountElement 方法新增了一个参数 oldDOM
    // 作用是在将 DOM 对象插入到页面前 将页面中已存在的 DOM 对象删除 否则无论是旧DOM对象还是新DOM对象都会显示在页面中
    mountElement(virtualDOM, container, oldDOM)
  }
}

/**
 * @param virtualDOM 获取更新后的组件构造函数
 * @param oldComponent 获取未更新前的组件构造函数
 * @ 两者等价就表示是同一组件
 */
function isSameComponent(virtualDOM, oldComponent) {
  // virtualDOM.type 更新后的组件构造函数
  // oldComponent.constructor 未更新前的组件构造函数
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
