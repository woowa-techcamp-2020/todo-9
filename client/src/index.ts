import { App } from './components/App'
import { domRenderer } from './utils/wooact'
import './styles/reset.scss'
import './utils/dragAndDrop'

domRenderer(
  new App({}, { menuVisible: false, userModalVisible: false, users: [] }),
  document.querySelector('#App')
)
