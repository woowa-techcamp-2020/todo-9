import { Component } from '../../utils/wooact'
import { aside, div, i } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class SideBar extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // constructor(props: IProps, state: IState) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, SideBar.prototype)
    this.init()
  }

  render() {
    return aside(
      { className: 'sidebar-container' },
      div(
        { className: 'icon-container' },
        div(
          { className: 'left-icon' },
          i({ className: 'f7-icons color-black', textContent: 'house' })
        )
      )
    )
  }
}

export default SideBar
