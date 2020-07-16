import { default as SdeBarItem } from './SdeBarItem'
import { domRenderer } from '../../utils/wooact'

let sdebaritemComponent: SdeBarItem
let sdebaritemElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  sdebaritemComponent = new SdeBarItem()
  domRenderer(sdebaritemComponent, app)
  sdebaritemElement = sdebaritemComponent.getElement()
})

afterEach(() => {
  sdebaritemElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[SdeBarItem Component]', () => {
  test('SdeBarItem이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(sdebaritemElement)).toBeTruthy()
  })
})



