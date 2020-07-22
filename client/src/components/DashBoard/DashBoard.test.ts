import { default as DashBoard } from './DashBoard'
import { domRenderer } from '../../utils/wooact'

let dashboardComponent: DashBoard
let dashboardElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  dashboardComponent = new DashBoard()
  domRenderer(dashboardComponent, app)
  dashboardElement = dashboardComponent.getElement()
})

afterEach(() => {
  dashboardElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[DashBoard Component]', () => {
  test('DashBoard이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(dashboardElement)).toBeTruthy()
  })
})



