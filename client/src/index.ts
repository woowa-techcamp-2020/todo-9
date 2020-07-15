import App from './App'
import DOMRenderer from './utils/renderDom'

console.log('loded')
try {
  const $target = document.getElementById('App')
  console.log($target)
  DOMRenderer.render(new App(), $target)
} catch (e) {
  console.error(e)
}
