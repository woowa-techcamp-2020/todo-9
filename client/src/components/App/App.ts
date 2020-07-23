import { Component } from '../../utils/wooact'
import { div, main, ul, i } from '../../utils/wooact/defaultElements'

// 개발용
import { Header } from '../Header'
import { SideBar } from '../SideBar'
import { Column } from '../Column'
import { ColumnAddButton } from '../ColumnAddButton'
import { getUsers } from '../../apis/user'
import DashBoard from '../DashBoard/DashBoard'

// 테스팅용
// import Header from '../Header/Header'
// import SideBar from '../SideBar/SideBar'
// import Column from '../Column/Column'

interface IProps {}
interface IState {
  menuVisible: boolean
  // userId?: number;
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
  }

  onToggleSideMenu = () => {
    const sidebar = document.querySelector('.sidebar-container')
    if (sidebar.classList.contains('visible')) {
      sidebar.classList.remove('visible')
      return
    }
    sidebar.classList.add('visible')
  }

  render() {
    const { onToggleSideMenu } = this
    return div(
      { className: 'container' },
      new Header({ title: '우와한 투두', onToggleSideMenu }),
      new DashBoard({ userId: 1 }, { kanbans: [] }),
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
