import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'

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

interface IProps {}
interface IState {
  menuVisible: boolean
  userModalVisible: boolean
  selectedUserId: number
  users: IUser[]
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
    const users = await getUsers()
    this.setState('users', users)
  }

  onToggleSideMenu = () => {
    const sidebar = document.querySelector('.sidebar-container')
    sidebar.classList.add('visible')
  }

  onSelectUser = (userId: number) => {
    this.setState('selectedUserId', userId)
    this.setState('userModalVisible', false)
  }

  render() {
    const { onToggleSideMenu } = this
    return div(
      { className: 'container' },
      new Header({ title: 'TODO 서비스', onToggleSideMenu }),
      this.getState('selectedUserId')
        ? new DashBoard(
            { userId: this.getState('selectedUserId') },
            { kanbans: [] }
          )
        : null,
      div({ className: 'float-item' }),
      new SideBar(
        {
          visible: this.getState('menuVisible'), // 왜 우는지 모르겠음 ㅜㅜ
          onToggleSideMenu: () => this.onToggleSideMenu(),
        },
        {}
      ),
      this.getState('userModalVisible')
        ? new UserModal({
            users: this.getState('users'),
            onSelectUser: (userId) => this.onSelectUser(userId),
          })
        : null
    )
  }
}

export default App
