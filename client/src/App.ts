import { Component } from './utils/Component'
import { main } from './utils/defaultElements'

interface IProps {}

interface IState {}

export default class App extends Component<IProps, IState> {
  constructor() {
    super()
  }

  componentDidMount() {}

  render() {
    main({ className: 'page-wrapper' })
  }
}
