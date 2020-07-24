import { Component } from '../../utils/wooact'
import { div, main, ul, i } from '../../utils/wooact/defaultElements'

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

  async componentDidMount() {
    // if (this.getState('userId')){
    //   return ;
    // }
    // const users = await getUsers()
    // this.setState('users', users)
  }

  onToggleSideMenu = () => {
    const sidebar = document.querySelector('.sidebar-container')
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible')
      return
    }
    sidebar.classList.add('visible')
  }

  onSelectUser = (userId: number) => {
    this.setState('selectedUserId', userId)
    this.setState('userModalVisible', false)
  }

  render() {
    const {
      onToggleSideMenu,
      onSelectUser,
      props: { users },
    } = this
    return div(
      { className: 'container' },
      new Header({ title: '우와한 투두', onToggleSideMenu }),
      this.getState('selectedUserId')
        ? new DashBoard(
            { userId: this.getState('selectedUserId') },
            { kanbans: [] }
          )
        : new UserModal({ users, onSelectUser }),
      div({ className: 'float-item' }),
      div({ className: 'float-column' }),
      new SideBar(
        {
          onToggleSideMenu: () => this.onToggleSideMenu(),
        },
        {}
      ),
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
