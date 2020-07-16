import { default as SideBarItem } from './SideBarItem'
import { domRenderer } from '../../utils/wooact'

let sidebaritemComponent: SideBarItem
let sidebaritemElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  sidebaritemComponent = new SideBarItem()
  domRenderer(sidebaritemComponent, app)
  sidebaritemElement = sidebaritemComponent.getElement()
})

afterEach(() => {
  sidebaritemElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[SideBarItem Component]', () => {
  test('SideBarItem이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(sidebaritemElement)).toBeTruthy()
  })
})



