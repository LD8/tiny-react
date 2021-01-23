import diff from './diff'

export default class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    // 这里的 this 指向：子类调用的就是指向子类，可以获取到子类的属性
    this.state = Object.assign({}, this.state, state)
    // 获取将要渲染的 virtualDOM 对象
    let virtualDOM = this.render()
    // 获取旧的 virtualDOM 对象，进行比对
    let oldDOM = this.getDOM()
    // 获取容器
    let container = oldDOM.parentNode
    // 实现对象
    diff(virtualDOM, container, oldDOM)
  }
  setDOM(dom) {
    this._dom = dom
  }
  getDOM() {
    return this._dom
  }
  updateProps(props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps != this.props || nextState != this.state
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, preState) {}
  componentWillUnmount() {}
}
