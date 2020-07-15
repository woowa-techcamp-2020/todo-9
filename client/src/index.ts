import App from './App'
import DOMRenderer from './utils/renderDom'

try {
  const $target = document.getElementById('#App')
  DOMRenderer.render(new App(), $target)
} catch (e) {
  console.error(e)
}
