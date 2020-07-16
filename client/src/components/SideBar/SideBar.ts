import { Component } from '../../utils/wooact';
import { div } from '../../utils/wooact/defaultElements'


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
    return div({ className: 'container' })
  }
}

export default SideBar;


