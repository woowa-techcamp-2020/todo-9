import { Component } from '../../utils/wooact'
import { aside, div, i, span } from '../../utils/wooact/defaultElements'

// 개발용
import { SideBarItem } from '../SideBarItem'

// 테스트용
// import SideBarItem from '../SideBarItem/SideBarItem'

interface IProps {
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
        className: `sidebar-container`,
        // className: `sidebar-container visible`,
      },

      div(
        {
          className: 'sidebar-header',
        },
        div(
          { className: 'icon-container' },
          div(
            { className: 'left-icon' },
            i({
              className: 'f7-icons f7-icon',
              textContent: 'bell_fill',
            })
          ),
          i({
            className: 'f7-icons f7-icon side-close',
            textContent: 'multiply',
            click: () => this.props.onToggleSideMenu(),
          })
        )
      ),
      div(
        {
          className: 'logs-container',
        },
        ...new Array(10).fill(0).map(() => new SideBarItem())
      )

      // item 없는 경우 white-bg 설정 해야함
    )
  }
}

export default SideBar
