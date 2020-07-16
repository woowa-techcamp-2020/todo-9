import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class Modal extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Modal.prototype)
    this.init()
  }

  render() {
    return div({ className: 'modal-container' })
  }
}

export default Modal
