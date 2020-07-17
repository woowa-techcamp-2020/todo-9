import { default as Header } from './Header'
import { domRenderer } from '../../utils/wooact'

let headerComponent: Header
let headerElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id="Test">' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  headerComponent = new Header({ title: 'woowa', onToggleSideMenu: () => {} })
  domRenderer(headerComponent, app)
  headerElement = headerComponent.getElement()
})

afterEach(() => {
  headerElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[Header Component]', () => {
  test('title이 woowa인 헤더가 정상적으로 생성된다', () => {
    //given
    // rendered
    // when
    // rendered
    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(headerElement)).toBeTruthy()
    const headerTitle = headerElement.querySelector('span')
    expect(headerTitle.textContent).toBe('woowa')
  })

  // test('menu 버튼이 눌리면, logger 컴포넌트가 렌더된다', () => {
  //   //given
  //   const button = headerElement.querySelector('button')
  //   expect(headerElement.querySelector('#logger-container')).toBeNull()

  //   // when
  //   fireEvent.click(button)
  //   // the
  //   expect(headerElement.querySelector('#logger-container')).not.toBeNull()
  // })
})
