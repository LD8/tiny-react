import isFunctionComponent from './isFunctionComponent'
import isFunction from './isFunction'
import mountNativeElement from './mountNativeElement'

/**
 * mountComponent 方法 挂载组件
 * @param virtualDOM virtualDOM 对象
 * @param container DOM容器，一般为 div#root
 * @param oldDOM 老的 DOM 容器
 */
export default function mountComponent(virtualDOM, container, oldDOM) {
  // 存放组件调用后返回的 Virtual DOM 的容器
  let nextVirtualDOM = null
  let component = null
  // 区分【函数型组件】和【类组件】
  if (isFunctionComponent(virtualDOM)) {
    // 【函数组件】 调用 buildFunctionalComponent 方法处理函数组件
    nextVirtualDOM = buildFunctionalComponent(virtualDOM)
    // console.log(nextVirtualDOM)
  } else {
    // 【类组件】
    nextVirtualDOM = buildClassComponent(virtualDOM)
    component = nextVirtualDOM.component
  }
  // 判断得到的 Virtual Dom 是否又是组件(组件套组件的情况)
  if (isFunction(nextVirtualDOM)) {
    // 如果是组件 继续调用 mountComponent 解剖组件
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    // 如果是 Navtive Element 就去渲染
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
  // 挂在完成后处理 ref
  if (component) {
    component.componentDidMount()
    if (component.props && component.props.ref) {
      component.props.ref(component)
    }
  }
}

// 【函数组件】处理
function buildFunctionalComponent(virtualDOM) {
  // 通过 Virtual DOM 中的 type 属性获取到组件函数并调用
  // console.log(virtualDOM)
  // 组件返回要渲染的 Virtual DOM
  // 调用组件函数时将 Virtual DOM 对象中的 props 属性传递给组件函数 这样在组件中就可以通过 props 属性获取数据了
  return virtualDOM && virtualDOM.type(virtualDOM.props || {})
}

// 【类组件】处理
function buildClassComponent(virtualDOM) {
  // virtualDOM.type 就是这个 class-based component 的构造函数
  // 将先接收的 props 传入构造函数
  const component = new virtualDOM.type(virtualDOM.props || {})
  // 拿到实例以后调用 render 方法得到 虚拟DOM
  const nextVirtualDOM = component.render()
  // 将实例对象保存在 virtualDOM 中，以便 mountNativeElement 使用
  nextVirtualDOM.component = component
  return nextVirtualDOM
}
