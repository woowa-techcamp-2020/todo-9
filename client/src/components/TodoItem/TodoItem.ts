import { Component } from '../../utils/wooact'
import { li, div, cite, i, input } from '../../utils/wooact/defaultElements'
import { IItem } from '../../apis/item'
import { AddItemInput } from '../AddItemInput'

interface IProps extends IItem {
  author: string
}
interface IState {
  isEditMode: boolean
}

class TodoItem extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, TodoItem.prototype)
    this.init()
  }

  changeMode() {
    this.setState('isEditMode', !this.getState('isEditMode'))
  }

  render() {
    const { author, content, id } = this.props

    return div(
      { className: 'item-wrapper', id: `item-${id}` },
      this.getState('isEditMode')
        ? new AddItemInput({
            initialValue: content,
            itemId: id,
            toggleAddItemInput: () => this.changeMode(),
          })
        : div(
            {},
            div(
              { className: 'item-top' },
              i({ className: 'f7-icons', textContent: 'calendar' }),
              div({
                className: 'item-contents',
                textContent: content,
                ondblclick: () => this.changeMode(),
              }),
              i({
                className: 'f7-icons todo-update',
                textContent: 'pencil',
                onclick: () => this.changeMode(),
              }),
              i({ className: 'f7-icons todo-close', textContent: 'trash' })
            ),
            div(
              { className: 'item-bottom', textContent: 'Added By ' },
              cite({
                className: 'todo-author',
                textContent: author,
              })
            )
          )
    )
  }
}

export default TodoItem
