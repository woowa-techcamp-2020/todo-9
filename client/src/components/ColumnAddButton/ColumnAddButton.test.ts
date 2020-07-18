import { default as ColumnAddButton } from './ColumnAddButton'
import { domRenderer } from '../../utils/wooact'

let columnaddbuttonComponent: ColumnAddButton
let columnaddbuttonElement: HTMLElement
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id=Test>' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {
  columnaddbuttonComponent = new ColumnAddButton()
  domRenderer(columnaddbuttonComponent, app)
  columnaddbuttonElement = columnaddbuttonComponent.getElement()
})

afterEach(() => {
  columnaddbuttonElement.remove()
})

afterAll(() => {
  app.remove()
})

describe('[ColumnAddButton Component]', () => {
  test('ColumnAddButton이 정상적으로 렌더된다.', () => {
    //given
    // rendered

    // when
    // rendered

    // then
    expect(app.hasChildNodes).toBeTruthy()
    expect(app.contains(columnaddbuttonElement)).toBeTruthy()
  })
})



