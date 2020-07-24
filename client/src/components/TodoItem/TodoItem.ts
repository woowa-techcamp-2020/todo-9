import { Component } from '../../utils/wooact'
import {
  li,
  div,
  cite,
  i,
  input,
  span,
} from '../../utils/wooact/defaultElements'
import { IItem, deleteItem } from '../../apis/item'
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

  async onRemoveItem() {
    await deleteItem(this.props.id)
    await window.dispatchEvent(new Event('item_changed'))
  }

  render() {
    const { author, content, id } = this.props
    const [title, ...contents] = content.split('\n')

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
            div({ className: 'vertical-bar', textContent: ' ' }),
            div(
              { className: 'item-top' },
              div(
                {
                  className: 'content-container',
                  ondblclick: () => this.changeMode(),
                },
                div({
                  className: 'item-title',
                  textContent: title,
                }),
                div({
                  className: 'item-contents',
                  textContent: contents.join(' '),
                })
              ),
              i({
                className: 'f7-icons todo-update',
                textContent: 'pencil',
                onclick: () => this.changeMode(),
              }),
              i({
                className: 'f7-icons todo-close',
                textContent: 'trash',
                onclick: () => this.onRemoveItem(),
              })
            ),
            div(
              {
                className: 'item-bottom',
                textContent: '작성자 ',
              },
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
