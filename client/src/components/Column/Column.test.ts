import { default as Column } from './Column'
import { domRenderer } from '../../utils/wooact'

let columnComponent: Column
let columnElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  columnComponent = new Column()
  domRenderer(columnComponent, app)
  columnElement = columnComponent.getElement()
})

afterEach(() => {
  columnElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Column Component]', () => {
  test('Column이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(columnElement)).toBeTruthy()
  })
})



