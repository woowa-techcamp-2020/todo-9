import { Component } from '../../utils/wooact'
import { li, div, cite, i } from '../../utils/wooact/defaultElements'
import { IItem } from '../../apis/item'

interface IProps extends IItem {
  author: string
}
interface IState {}

class TodoItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, TodoItem.prototype)
    this.init()
  }

  onMouseDown(e: Event) {
    const element = e.target as HTMLElement
    // element.closest('')
  }

  render() {
    const { author, content, id } = this.props

    return li(
      {
        className: 'item-wrapper',
        onmousedown: (e) => this.onMouseDown(e),
        id: `item-${id}`,
      },
      div(
        { className: 'item-top' },
        i({ className: 'f7-icons', textContent: 'calendar' }),
        div({
          className: 'item-contents',
          textContent: content,
        }),
        i({ className: 'f7-icons todo-close', textContent: 'multiply' })
      ),
      div(
        { className: 'item-bottom', textContent: 'Added By ' },
        cite({
          className: 'todo-author',
          textContent: author,
        })
      )
    )
  }
}

export default TodoItem
