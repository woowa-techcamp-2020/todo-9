import { Component } from '../../utils/wooact'
import { div, main, ul } from '../../utils/wooact/defaultElements'

// 개발용
import { Header } from '../Header'
import { SideBar } from '../SideBar'
import { Column } from '../Column'

// 테스팅용
// import Header from '../Header/Header'
// import SideBar from '../SideBar/SideBar'
// import Column from '../Column/Column'

interface IProps {}
interface IState {
  menuVisible: boolean
}

class App extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, App.prototype)
    this.init()
  }

  onToggleSideMenu = () => {
    this.setState('menuVisible', !this.getState('menuVisible'))
  }

  render() {
    const { onToggleSideMenu } = this
    return div(
      { className: 'container' },
      new Header({ title: 'TODO 서비스', onToggleSideMenu }),
      main(
        {},
        ul(
          { className: 'main-container' },
          ...new Array(5).fill(0).map(() => new Column())
        )
      ),
      new SideBar(
        { visible: this.getState('menuVisible'), onToggleSideMenu },
        {}
      )
    )
  }
}

export default App
