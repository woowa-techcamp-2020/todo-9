import { App } from './components/App'
import { domRenderer } from './utils/wooact'
import './styles/reset.scss'

domRenderer(new App({}, { menuVisible: false }), document.querySelector('#App'))
