import { default as App } from './App'
import { domRenderer } from '../../utils/wooact'
import Header from '../Header/Header'
import { fireEvent } from '@testing-library/dom'

let appComponent: App
let appElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  appComponent = new App({}, { menuVisible: false })
  domRenderer(appComponent, app)
  appElement = appComponent.getElement()
})

afterEach(() => {
  appElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[App Component]', () => {
  test('App이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(appElement)).toBeTruthy()
  })

  test('Header 컴포넌트의 menu버튼을 클릭하면 menuVisible state가 true가 된다.', () => {
    // given
    const { onToggleSideMenu } = appComponent
    const $header = new Header({ title: '', onToggleSideMenu })
    const $target = $header.getElement().querySelector('.menu-container')
    expect(appComponent.getState('menuVisible')).toBe(false)

    // when
    fireEvent.click($target)

    // expect
    expect(appComponent.getState('menuVisible')).toBe(true)
  })

  test('Header 컴포넌트의 menu버튼을 클릭하면 Sidebar가 렌더링된다.', () => {
    // given
    const $menuButton = appComponent
      .getElement()
      .querySelector('.menu-container')
    const $sidebar = appComponent
      .getElement()
      .querySelector('.sidebar-container')
    expect($sidebar.classList.contains('visible')).toBeFalsy()

    // when
    fireEvent.click($menuButton)

    // expect
    // render되면 새로운 노드로 테스트해야함
    const $newSideBar = appComponent
      .getElement()
      .querySelector('.sidebar-container')
    expect($newSideBar.classList.contains('visible')).toBeTruthy()
  })
})
