import { Component } from '../../utils/wooact'
import { Column } from '../Column'
import { button, i } from '../../utils/wooact/defaultElements'
import { CLASS_NAME, KEY_NAME } from '../../utils/constants'

interface IProps {
  userId: number
}
interface IState {}

class ColumnAddButton extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, ColumnAddButton.prototype)
    this.init()
  }

  onAddColumn = (e) => {
    const $newKanban = new Column(
      { kanbanId: 0, name: '', userName: '', items: [] },
      { itemAddInput: false, changeNameInput: true }
    )
    const $dashBoard = e.target.closest(`.${CLASS_NAME.DASH_BOARD}`)
    const $columnAddButton = e.target.closest(
      `.${CLASS_NAME.COLUMN_ADD_BUTTON}`
    )

    $dashBoard.insertBefore($newKanban.getElement(), $columnAddButton)
    const $input = $newKanban
      .getElement()
      .querySelector('.input-wrapper') as HTMLInputElement
    $input.focus()
    $input.dataset.type = 'add'
    $input.dataset.userId = String(this.props.userId)
    $input.addEventListener('blur', () => {
      $newKanban.getElement().style.display = 'none'
    })
  }

  render() {
    return button(
      { className: 'add-button-wrapper' },
      i({
        className: 'f7-icons',
        textContent: 'plus',
        onclick: (e) => this.onAddColumn(e),
      })
    )
  }
}

export default ColumnAddButton
