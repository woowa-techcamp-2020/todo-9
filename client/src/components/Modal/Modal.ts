import { Component } from '../../utils/wooact'
import { div, h1, input, i, button } from '../../utils/wooact/defaultElements'
import { BoxInput } from '../BoxInput'
import { BoxButton } from '../BoxButton'

interface IProps {
  title: string
  boxInput?: BoxInput
  boxButtons?: BoxButton[]
}
interface IState {}

class Modal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, Modal.prototype)
    this.init()
  }

  renderButtons() {
    const {
      props: { boxButtons },
    } = this

    if (!boxButtons) {
      return undefined
    }

    return div(
      {
        className: 'button-container',
      },
      ...boxButtons
    )
  }

  renderInputs() {
    const {
      props: { boxInput },
    } = this
    if (!boxInput) {
      return undefined
    }

    return div(
      {
        className: 'input-container',
      },
      boxInput
    )
  }

  closeModal() {
    this.getElement().remove()
  }

  render() {
    const {
      props: { title, boxInput },
    } = this

    return div(
      { className: 'page-container' },
      div({ className: 'page-background' }),
      div(
        { className: 'modal-container' },
        div(
          { className: 'modal-header-container' },
          h1({
            className: 'modal-header-title',
            textContent: title,
          }),
          button(
            {
              className: 'right-aligned-icon',
              click: () => this.closeModal(),
            },
            i({ className: 'f7-icons', textContent: 'X' })
          )
        ),
        this.renderInputs(),
        this.renderButtons()
      )
    )
  }
}

export default Modal
