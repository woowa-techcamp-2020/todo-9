import { Component } from '../../utils/wooact'
import { div, button } from '../../utils/wooact/defaultElements'

type TypeOfButton = 'negative' | 'positive'

interface IProps {
  buttonText: string
  onClickHandler: (e?: Event) => void
  type?: TypeOfButton
  disabled?: boolean
}

interface IState {}

class BoxButton extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, BoxButton.prototype)
    this.init()
  }

  render() {
    const {
      props: { type, onClickHandler, buttonText },
    } = this
    const buttonClass = `btn ${type || ''} ${
      buttonText.includes('Add') ? '' : 'submit-able'
    }`

    return button({
      className: buttonClass,
      textContent: buttonText,
      click: onClickHandler,
    })
  }
}

export default BoxButton
