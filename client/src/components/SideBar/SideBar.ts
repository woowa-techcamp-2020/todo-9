import { Component } from '../../utils/wooact'
import { aside, div, i, span } from '../../utils/wooact/defaultElements'
import { SideBarItem } from '../SideBarItem'
import { getLogs, ILog } from '../../apis/log'

interface IProps {
  userId: number
  onToggleSideMenu: () => void
}
interface IState {
  logs: ILog[]
}

class SideBar extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, SideBar.prototype)
    this.init()
  }

  async componentDidMount() {
    const logs = await getLogs(this.props.userId)
    this.setState('logs', logs)
  }

  renderLogs() {
    const logs = this.getState('logs')
    if (!logs) {
      return [null]
    }

    return this.getState('logs').map((log) => new SideBarItem({ ...log }))
  }

  render() {
    return aside(
      {
        className: `sidebar-container `,
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
            onclick: () => this.props.onToggleSideMenu(),
          })
        )
      ),
      div(
        {
          className: 'logs-container',
        },
        ...this.renderLogs()
      )

      // item 없는 경우 white-bg 설정 해야함
    )
  }
}

export default SideBar
