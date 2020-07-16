import { default as BoxButton } from './BoxButton'
import { domRenderer } from '../../utils/wooact'

let boxbuttonComponent: BoxButton
let boxbuttonElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  boxbuttonComponent = new BoxButton()
  domRenderer(boxbuttonComponent, app)
  boxbuttonElement = boxbuttonComponent.getElement()
})

afterEach(() => {
  boxbuttonElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[BoxButton Component]', () => {
  test('BoxButton이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(boxbuttonElement)).toBeTruthy()
  })
})



