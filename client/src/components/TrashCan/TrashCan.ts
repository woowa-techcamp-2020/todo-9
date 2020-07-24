import { Component } from '../../utils/wooact'
import { div, i } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class TrashCan extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // constructor(props: IProps, state: IState) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, TrashCan.prototype)
    this.init()
  }

  render() {
    return div(
      {
        className: 'trash-can',
      },
      i({
        className: 'f7-icons todo-close',
        textContent: 'trash',
      })
    )
  }
}

export default TrashCan
