---
title: tips_1 
date: 2020-07-17 22:21:21
tags: [tips]
---

```react
class Clock extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount(){
    this.timerId = setInterval(()=>this.tick(),1000);
  }

  componentWillUnmount(){
    clearInterval(this.timerId)
  }

  tick(){
    this.setState({
      date: new Date()
    })
  }

  render(){
    return (
      <div>
        <h1>hello</h1>
        <h2>it is {this.state.date.toLocaleTimeString()} now.</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById("root")
)

```

执行顺序：

- ```<Clock />```被传入```ReactDOM.render()```，调用Clock组件的构造函数```constructor()```，创建了一个```state```
- React调用Clock组件的```render()```方法，更新DOM来渲染
- ```CLock```的输出插入到DOM中后，React调用```ComponentDidMount```方法。这段代码中，向浏览器请求了一个定时器，每秒调用一次组件的```tick()```方法。
- ```tick()```方法中调用```setState()```方法，修改组件的状态，计划UI的更新。React在```setState()```方法被调用后就知道组件的状态被改变了，重新调用```render()```方法，而此时```render()```方法中的```this.state.date()```就不一样了，页面上渲染的内容也不一样了。
- 当Clock组件从DOM中被移除，就会调用```componentWillUnmount()```方法，会把计时器清空。


