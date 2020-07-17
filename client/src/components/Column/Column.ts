import { Component } from '../../utils/wooact'
import { div, span, i, li } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

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
            i({ className: 'f7-icons todo-add-button', textContent: '+' }),
            i({
              className: 'f7-icons todo-more-button',
              textContent: 'ellipsis',
            })
          )
        )
      )
    )
  }
}

export default Column
