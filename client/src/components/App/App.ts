import { Component } from '../../utils/wooact'
import { div, main, ul, i } from '../../utils/wooact/defaultElements'
import { getUserId } from '../../utils/getUserId'
// 개발용
import { Header } from '../Header'
import { SideBar } from '../SideBar'
import { getUsers, IUser } from '../../apis/user'
import { Modal } from '../Modal'
import { UserModal } from '../UserModal'
import DashBoard from '../DashBoard/DashBoard'

// 테스팅용
// import Header from '../Header/Header'
// import SideBar from '../SideBar/SideBar'
// import Column from '../Column/Column'

interface IProps {
  users: IUser[]
}
interface IState {
  menuVisible: boolean
  userModalVisible: boolean
  selectedUserId: number
}

class App extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props, state)

    Object.setPrototypeOf(this, App.prototype)
    this.init()
  }

  onToggleSideMenu = () => {
    this.setState('menuVisible', !this.getState('menuVisible'))
  }

  onSelectUser = (userId: number) => {
    this.setState('selectedUserId', userId)
    this.setState('userModalVisible', false)
  }

  render() {
    const {
      onSelectUser,
      props: { users },
    } = this
    console.log(getUserId())
    return div(
      {
        className: 'todo-container',
        id: `todo-${this.getState('selectedUserId')}`,
      },
      new Header({
        title: '우와한 투두',
        onToggleSideMenu: () => this.onToggleSideMenu(),
      }),
      this.getState('selectedUserId') !== null
        ? new DashBoard(
            { userId: this.getState('selectedUserId') },
            { kanbans: [] }
          )
        : new UserModal({ users, onSelectUser }),
      div({ className: 'float-item' }),
      div({ className: 'float-column' }),
      this.getState('menuVisible')
        ? new SideBar(
            {
              userId: this.getState('selectedUserId') as number,
              onToggleSideMenu: () => this.onToggleSideMenu(),
            },
            { logs: [] }
          )
        : null,
      div(
        {
          className: 'trash-can',
        },
        i({
          className: 'f7-icons todo-close',
          textContent: 'trash',
        })
      )
    )
  }
}

export default App
