import { main, div } from './utils/wooact/defaultElements'
import { Component } from './utils/wooact'
import { Modal } from './components/Modal'
import { Header } from './components/Header'

interface IProps {}

interface IState {}

export default class App extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, App.prototype)
    this.init()
  }

  render() {
    return div(
      { className: 'container' },
      new Modal(),
      new Header({ title: 'TODO 서비스', toggleSideMenu: () => {} })
    )
  }
}
