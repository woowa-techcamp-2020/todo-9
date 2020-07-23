import { App } from './components/App'
import { domRenderer } from './utils/wooact'
import './styles/reset.scss'
import './utils/dragAndDrop'

domRenderer(
  new App(
    {},
    { menuVisible: false, userModalVisible: true, users: [], selectedUserId: 0 }
  ),
  document.querySelector('#App')
)
