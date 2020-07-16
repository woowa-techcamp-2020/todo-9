import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { Modal } from '../Modal'
import { Header } from '../Header'

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
      new Header({ title: 'TODO 서비스', onToggleSideMenu })
    )
  }
}

export default App
