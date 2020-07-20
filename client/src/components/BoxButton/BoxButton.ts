import { Component } from '../../utils/wooact'
import { div, button } from '../../utils/wooact/defaultElements'

type TypeOfButton = 'negative' | 'positive'

interface IProps {
  buttonText: string
  onClickHandler: () => void
  type?: TypeOfButton
  disabled?: boolean
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
    const {
      props: { type, onClickHandler, disabled },
    } = this
    const buttonClass = `btn ${type || ''}`

    return button({
      className: buttonClass,
      textContent: this.props.buttonText,
      click: () => onClickHandler(),
      // disabled: disabled || false,
    })
  }
}

export default BoxButton
