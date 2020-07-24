import { App } from './components/App'
import { domRenderer } from './utils/wooact'
import './styles/reset.scss'
import './utils/dragAndDrop'
// import './utils/dragAndDropColumn'
import { getUsers } from './apis/user'

getUsers().then((users) =>
  domRenderer(
    new App(
      { users: users },
      {
        menuVisible: false,
        userModalVisible: true,
        selectedUserId: 1,
      }
    ),
    document.querySelector('#App')
  )
)
