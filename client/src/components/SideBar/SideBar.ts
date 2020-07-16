import { Component } from '../../utils/wooact'
import { aside, div, i, span } from '../../utils/wooact/defaultElements'

// 개발용
import { SideBarItem } from '../SideBarItem'

// 테스트용
// import SideBarItem from '../SideBarItem/SideBarItem'

interface IProps {
  visible: boolean
  onToggleSideMenu: () => void
}
interface IState {}

class SideBar extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, SideBar.prototype)
    this.init()
  }

  render() {
    return aside(
      {
        className: `sidebar-container ${this.props.visible ? 'visible' : ''}`,
      },
      div(
        { className: 'icon-container' },
        div(
          { className: 'left-icon' },
          i({
            className: 'f7-icons f7-icon',
            textContent: 'menu',
          }),
          span({ className: 'icon-title', textContent: 'Menu' })
        ),
        i({
          className: 'f7-icons f7-icon side-close',
          textContent: 'multiply',
          click: this.props.onToggleSideMenu,
        })
      ),
      div(
        { className: 'icon-container' },
        div(
          { className: 'left-icon' },
          i({
            className: 'f7-icons f7-icon',
            textContent: 'bell_fill',
          }),
          span({ className: 'icon-title', textContent: 'Activity' })
        )
      ),
      ...new Array(10).fill(0).map(() => new SideBarItem().getElement())
      // item 없는 경우 white-bg 설정 해야함
    )
  }
}

export default SideBar
