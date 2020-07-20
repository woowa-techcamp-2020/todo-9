import { default as AddItemInput } from './AddItemInput'
import { domRenderer } from '../../utils/wooact'

let additeminputComponent: AddItemInput
let additeminputElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  additeminputComponent = new AddItemInput()
  domRenderer(additeminputComponent, app)
  additeminputElement = additeminputComponent.getElement()
})

afterEach(() => {
  additeminputElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[AddItemInput Component]', () => {
  test('AddItemInput이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(additeminputElement)).toBeTruthy()
  })
})



