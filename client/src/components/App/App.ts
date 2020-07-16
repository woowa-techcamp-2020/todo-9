import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'

// 개발용
// import { Modal } from '../Modal'
// import { Header } from '../Header'
// import { SideBar } from '../SideBar'

// 테스팅용
import Modal from '../Modal/Modal'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'

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
      new Modal(),
      new Header({ title: 'TODO 서비스', onToggleSideMenu }),
      new SideBar(
        { visible: this.getState('menuVisible'), onToggleSideMenu },
        {}
      )
    )
  }
}

export default App
