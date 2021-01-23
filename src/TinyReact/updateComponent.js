import diff from './diff'

/**
 * updateComponent
 * @param virtualDOM 组件本身的 virtualDOM 对象
 *                   通过它可以获取到组件最新的 props
 * @param oldComponent 要更新的组件的实例对象
 *                     通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
 * @param oldDOM 要更新的 DOM 对象
 *               在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
 * @param container 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
 */
export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
  // 生命周期函数
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  if (
    // 调用 shouldComponentUpdate 生命周期函数判断是否要执行更新操作
    oldComponent.shouldComponentUpdate(virtualDOM.props)
  ) {
    // 将未更新的 props 保存一份
    let prevProps = oldComponent.props
    // 生命周期函数
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 更新组件的 props 属性 updateProps 方法定义在 Component 类型
    oldComponent.updateProps(virtualDOM.props)
    // 因为组件的 props 已经更新 所以调用 render 方法获取最新的 Virtual DOM
    const nextVirtualDOM = oldComponent.render()
    // 将组件实例对象挂载到 Virtual DOM 身上
    nextVirtualDOM.component = oldComponent
    // 调用diff方法更新视图
    diff(nextVirtualDOM, container, oldDOM)
    // 生命周期函数
    oldComponent.componentDidUpdate(prevProps)
  }
}
