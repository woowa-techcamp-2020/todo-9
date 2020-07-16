// import { Component } from './utils/wooact'
import { Header } from './components/Header'
import { main, div } from './utils/wooact/defaultElements'
import { Component } from './utils/wooact'

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
      new Header({ title: 'donguk-9', toggleSideMenu: () => {} })
    )
  }
}
