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

interface IProps {}
interface IState {
  items: string[]
}

class Column extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, Column.prototype)
    this.init()
  }

  render() {
    return li(
      { className: 'column-container' },
      div(
        { className: 'column-wrapper' },
        div(
          { className: 'column-header' },
          div(
            { className: 'header-left' },
            span({ className: 'todo-count', textContent: '5' }),
            span({ className: 'todo-title', textContent: '해야할 일' })
          ),
          div(
            { className: 'header-right' },
            i({
              className: 'f7-icons todo-add-button',
              textContent: 'plus',
              click: () => alert('개발 예정'),
            }),
            i({
              className: 'f7-icons todo-more-button',
              textContent: 'ellipsis',
              click: () => alert('개발 예정'),
            })
          )
        ),
        section(
          { className: 'item-container' },
          ul({}, ...new Array(10).fill(0).map(() => new TodoItem()))
        )
      )
    )
  }
}

export default Column
