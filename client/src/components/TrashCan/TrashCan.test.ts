import { default as TrashCan } from './TrashCan'
import { domRenderer } from '../../utils/wooact'

let trashcanComponent: TrashCan
let trashcanElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  trashcanComponent = new TrashCan()
  domRenderer(trashcanComponent, app)
  trashcanElement = trashcanComponent.getElement()
})

afterEach(() => {
  trashcanElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[TrashCan Component]', () => {
  test('TrashCan이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(trashcanElement)).toBeTruthy()
  })
})



