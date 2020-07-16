import { Component } from '../../utils/wooact'
import { div, button } from '../../utils/wooact/defaultElements'

interface IProps {
  buttonText: string
}
interface IState {}

class BoxButton extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    // constructor(props: IProps, state: IState) {
    //   super(props, state)
    // constructor() {
    //   super()

    Object.setPrototypeOf(this, BoxButton.prototype)
    this.init()
  }

  render() {
    return button({
      className: 'button',
      textContent: this.props.buttonText,
    })
  }
}

export default BoxButton
