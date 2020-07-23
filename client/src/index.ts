import { App } from './components/App'
import { domRenderer } from './utils/wooact'
import './styles/reset.scss'
import './utils/dragAndDrop'
import './utils/dragAndDropColumn'

domRenderer(new App({}, { menuVisible: false }), document.querySelector('#App'))
