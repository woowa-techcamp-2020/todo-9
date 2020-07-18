import { Component } from '../../utils/wooact'
import { li, div, cite, i } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class TodoItem extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, TodoItem.prototype)
    this.init()
  }

  render() {
    return li(
      { className: 'item-wrapper' },
      div(
        { className: 'item-top' },
        i({ className: 'f7-icons', textContent: 'calendar' }),
        div({
          className: 'item-contents',
          textContent: '아니 벌써 데모라니...?',
        }),
        i({ className: 'f7-icons todo-close', textContent: 'multiply' })
      ),
      div(
        { className: 'item-bottom', textContent: 'Added By' },
        cite({
          className: 'todo-author',
          textContent: 'Added By Woowa',
        })
      )
    )
  }
}

export default TodoItem
