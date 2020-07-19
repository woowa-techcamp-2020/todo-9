import { default as TodoItem } from './TodoItem'
import { domRenderer } from '../../utils/wooact'

let todoitemComponent: TodoItem
let todoitemElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  todoitemComponent = new TodoItem()
  domRenderer(todoitemComponent, app)
  todoitemElement = todoitemComponent.getElement()
})

afterEach(() => {
  todoitemElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[TodoItem Component]', () => {
  test('TodoItem이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(todoitemElement)).toBeTruthy()
  })
})



