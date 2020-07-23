import { default as TextInput } from './TextInput'
import { domRenderer } from '../../utils/wooact'

let textinputComponent: TextInput
let textinputElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  textinputComponent = new TextInput()
  domRenderer(textinputComponent, app)
  textinputElement = textinputComponent.getElement()
})

afterEach(() => {
  textinputElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[TextInput Component]', () => {
  test('TextInput이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(textinputElement)).toBeTruthy()
  })
})



