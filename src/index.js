import TinyReact from './TinyReact'

const root = document.getElementById('root')

// const virtualDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2 data-test="test">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert('你好')}>点击我</button>
//     <h3>这个将会被删除</h3>
//     2, 3
//     <input type="text" value="13" />
//   </div>
// )

// // 将 virtualDOM 转换为 真实DOM，然后挂载到 div#root
// TinyReact.render(virtualDOM, root)

// const modifiedDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2 data-test="test123">(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <button onClick={() => alert('你好!!!')}>点击我</button>
//     <h6>这个将会被删除</h6>
//     2, 3
//     <input type="text" value="13" />
//   </div>
// )
// setTimeout(() => {
//   TinyReact.render(modifiedDOM, root)
// }, 2000)

// function Demo(props) {
//   return <h1>&hearts; {props.title}</h1>
// }

// function Heart(props) {
//   return <Demo title={props.title} />
// }

// // TinyReact.render(<Heart title="Hello React" />, root)

class Alert extends TinyReact.Component {
  constructor(props) {
    // super() 就是在调用父类中的构造函数，并将新接收的 props 作为参数传入
    super(props)
    this.state = {
      title: 'Default Title',
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({ title: 'Title Changed' })
  }
  componentWillReceiveProps(prevProps) {
    console.log('componentWillReceiveProps: ', prevProps), console.log(this.shouldComponentUpdate())
  }
  // 通过 render 方法 返回组件需要渲染的 virtualDOM
  render() {
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <div>
          {this.state.title}
          <button onClick={this.handleClick}>change title</button>
        </div>
      </div>
    )
  }
}

// TinyReact.render(<Alert name="Marry" age={20} />, root)

// setTimeout(() => {
//   TinyReact.render(<Alert name="Helen" age={50} />, root)
//   // TinyReact.render(<Heart title="Hello React" />, root)
// }, 2000)

// console.log(virtualDOM)

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log(this.input.value)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  render() {
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <Alert ref={(alert) => (this.alert = alert)} name="Helen" age={30} />
        <button onClick={this.handleClick.bind(this)}>按钮</button>
      </div>
    )
  }
}

TinyReact.render(<DemoRef />, root)
