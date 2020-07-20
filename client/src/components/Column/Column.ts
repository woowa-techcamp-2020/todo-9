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

interface IProps {}
interface IState {
  showInput: boolean
  items: string[]
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
            })
          : null,
        ul({}, ...new Array(10).fill(0).map(() => new TodoItem()))
      )
    )
  }
}

export default Column
