/**
 * updateNodeElement 为DOM元素添加属性
 * @param newElement 新建的元素
 * @param virtualDOM 通过对虚拟DOM的props属性进行遍历添加属性
 */
export default function updateElementNode(element, virtualDOM) {
  // 获取要解析的 VirtualDOM 对象中的属性对象
  const newProps = virtualDOM.props
  // 将属性对象中的属性名称放到一个数组中并循环数组
  Object.keys(newProps).forEach((propName) => {
    const newPropsValue = newProps[propName]
    // 考虑属性名称是否以 on 开头 如果是就表示是个事件属性 onClick -> click
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      element.addEventListener(eventName, newPropsValue)
      // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
    } else if (propName === 'value' || propName === 'checked') {
      element[propName] = newPropsValue
      // 刨除 children 因为它是子元素 不是属性
    } else if (propName !== 'children') {
      // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 JavaScript 中的关键字
      if (propName === 'className') {
        element.setAttribute('class', newPropsValue)
      } else {
        // 普通属性
        element.setAttribute(propName, newPropsValue)
      }
    }
  })
}
