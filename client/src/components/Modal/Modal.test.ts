import { default as Modal } from './Modal'
import { domRenderer } from '../../utils/wooact'

let modalComponent: Modal
let modalElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  modalComponent = new Modal()
  domRenderer(modalComponent, app)
  modalElement = modalComponent.getElement()
})

afterEach(() => {
  modalElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Modal Component]', () => {
  test('Modal이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(modalElement)).toBeTruthy()
  })
})
