import { Component } from '../../utils/wooact'
import { div, button, i } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class ColumnAddButton extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, ColumnAddButton.prototype)
    this.init()
  }

  render() {
    return button(
      { className: 'add-button-wrapper' },
      i({ className: 'f7-icons', textContent: 'plus' })
    )
  }
}

export default ColumnAddButton
