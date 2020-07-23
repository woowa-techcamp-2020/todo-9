import { default as UserModal } from './UserModal'
import { domRenderer } from '../../utils/wooact'

let usermodalComponent: UserModal
let usermodalElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  usermodalComponent = new UserModal()
  domRenderer(usermodalComponent, app)
  usermodalElement = usermodalComponent.getElement()
})

afterEach(() => {
  usermodalElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[UserModal Component]', () => {
  test('UserModal이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(usermodalElement)).toBeTruthy()
  })
})



