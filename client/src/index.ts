import App from './App'
import { domRenderer } from './utils/wooact'

domRenderer(new App(), document.querySelector('#App'))
