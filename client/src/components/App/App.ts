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

  render() {
    const { onToggleSideMenu } = this
    return div(
      { className: 'container' },
      new Header({ title: 'TODO 서비스', onToggleSideMenu }),
      new DashBoard({ userId: 1 }, { kanbans: [] }),
      div({ className: 'float-item' }),
      new SideBar(
        {
          visible: this.getState('menuVisible'), // 왜 우는지 모르겠음 ㅜㅜ
          onToggleSideMenu: () => this.onToggleSideMenu(),
        },
        {}
      ),
      new UserModal({
        users: this.getState('users'),
      })
    )
  }
}

export default App
