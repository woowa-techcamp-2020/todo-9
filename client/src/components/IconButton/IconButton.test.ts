import { default as IconButton } from './IconButton'
import { domRenderer } from '../../utils/wooact'

let iconbuttonComponent: IconButton
let iconbuttonElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  iconbuttonComponent = new IconButton()
  domRenderer(iconbuttonComponent, app)
  iconbuttonElement = iconbuttonComponent.getElement()
})

afterEach(() => {
  iconbuttonElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[IconButton Component]', () => {
  test('IconButton이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(iconbuttonElement)).toBeTruthy()
  })
})



