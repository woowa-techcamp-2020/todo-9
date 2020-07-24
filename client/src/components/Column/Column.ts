import { Component } from '../../utils/wooact'
import { div, span, i, ul } from '../../utils/wooact/defaultElements'
import { TodoItem } from '../TodoItem'
import { AddItemInput } from '../AddItemInput'
import { TextInput } from '../TextInput'
import { IKanban } from '../../apis/kanban'
import { updateKanbanName, deleteKanban } from '../../apis/kanban'

interface IProps extends IKanban {
  userId?: number
}
interface IState {
  itemAddInput: boolean
  changeNameInput: boolean
}

class Column extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, Column.prototype)
    this.init()
  }

  onToggleChangeNameInput() {
    this.setState('changeNameInput', !this.getState('changeNameInput'))
  }

  onToggleAddInput() {
    this.setState('itemAddInput', !this.getState('itemAddInput'))
  }

  async onSubmitChangeName(name: string) {
    try {
      await updateKanbanName(String(this.props.kanbanId), { name })
    } catch (e) {
      console.error(e)
    }
  }

  async deleteKanbanHandler(e) {
    const result = confirm('삭제하시겠습니까?')
    if (!result) {
      return result
    }
    try {
      const $target = e.target as HTMLLIElement
      const $kanban = $target.closest('.column-container') as HTMLLIElement
      const kanbanName = $kanban.dataset.name
      await deleteKanban(String(this.props.kanbanId), kanbanName)
      window.dispatchEvent(new Event('item_changed'))
    } catch (e) {
      console.error(e)
    }
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
        id: String(kanbanId),
        [`data-name`]: name,
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
            this.getState('changeNameInput')
              ? new TextInput({
                  value: name,
                  onToggleChangeNameInput: () => this.onToggleChangeNameInput(),
                  onSubmitChangeName: (value) => this.onSubmitChangeName(value),
                })
              : span({
                  className: 'todo-title',
                  textContent: name,
                  ondblclick: () => this.onToggleChangeNameInput(),
                })
          ),
          div(
            { className: 'header-right' },
            i({
              className: 'f7-icons todo-add-button',
              textContent: 'plus',
              click: () => this.onToggleAddInput(),
            }),
            i({
              className: 'f7-icons todo-more-button',
              textContent: 'trash',
              click: (e) => this.deleteKanbanHandler(e),
            })
          )
        ),
        this.getState('itemAddInput')
          ? new AddItemInput({
              toggleAddItemInput: () => this.onToggleAddInput(),
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
