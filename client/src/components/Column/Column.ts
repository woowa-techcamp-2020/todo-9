import { Component } from '../../utils/wooact'
import {
  div,
  span,
  i,
  li,
  section,
  ul,
} from '../../utils/wooact/defaultElements'
import { TodoItem } from '../TodoItem'
import AddItemInput from '../AddItemInput/AddItemInput'
import { IItem } from '../../apis/item'
import { IKanban } from '../../apis/kanban'

interface IProps extends IKanban {}
interface IState {
  showInput: boolean
}

class Column extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, Column.prototype)
    this.init()
  }

  onToggleInputBox() {
    this.setState('showInput', !this.getState('showInput'))
  }

  renderItems() {
    const { items, userName } = this.props

    if (!items.length) {
      return [null]
    }

    return items.map(
      (item) =>
        new TodoItem({ ...item, author: userName }, { isEditMode: false })
    )
  }

  render() {
    const { name, userName, items, kanbanId } = this.props

    return div(
      {
        className: 'column-container',
      },
      div(
        { className: 'column-wrapper' },
        div(
          { className: 'column-header' },
          div(
            { className: 'header-left' },
            span({
              className: 'todo-count',
              textContent: items.length.toString(),
            }),
            span({ className: 'todo-title', textContent: name })
          ),
          div(
            { className: 'header-right' },
            i({
              className: 'f7-icons todo-add-button',
              textContent: 'plus',
              click: () => this.onToggleInputBox(),
            }),
            i({
              className: 'f7-icons todo-more-button',
              textContent: 'ellipsis',
              click: () => alert('개발 예정'),
            })
          )
        ),
        this.getState('showInput')
          ? new AddItemInput({
              toggleAddItemInput: () => this.onToggleInputBox(),
              kanbanId,
            })
          : null,
        ul(
          { className: 'column-items-container', id: `column-${kanbanId}` },
          ...this.renderItems()
        )
      )
    )
  }
}

export default Column
