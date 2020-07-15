import { Component } from './utils/Component'
import { Header } from './components/Header/Header'
import { main, div } from './utils/defaultElements'

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
      new Header({ title: 'donguk-9', onClickMenu: () => {} })
    )
  }
}
