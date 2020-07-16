import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class IconButton extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // constructor(props: IProps, state: IState) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, IconButton.prototype)
    this.init()
  }

  render() {
    return div({ className: 'container' })
  }
}

export default IconButton
