import { generateElement } from '../generateElement'
import { div } from '../defaultElements'
import { Component } from '../Component'

let testComponent
let app: HTMLElement = null

beforeAll(() => {
  document.body.innerHTML = '<div id="Test">' + '</div>'
  app = document.querySelector('#Test')
})

beforeEach(() => {})

afterEach(() => {
  testComponent.getElement().remove()
})

afterAll(() => {
  app.remove()
})

describe('[test component which extends Component]', () => {
  test('test component가 props만 가지고 있을 때, props를 찾을 수 있다', () => {
    //given
    const name = 'andy'
    interface IProps {
      name: string
    }
    class TestComponent extends Component<IProps, {}> {
      constructor(props: IProps) {
        super(props)

        Object.setPrototypeOf(this, TestComponent.prototype)
        this.init()
      }
      render() {
        return div(
          { className: this.props.name },
          div(
            { className: this.props.name },
            div({ className: this.props.name }),
            div({ className: this.props.name }),
            div({ className: this.props.name }),
            div({ className: this.props.name })
          )
        )
      }
    }

    testComponent = new TestComponent({ name })
    app.appendChild(testComponent.getElement())

    const andyDom = document.querySelector(`.${name}`)
    expect(andyDom.classList.length).toBe(1)
  })

  test('test component가 props만 가지고 있을 때, props를 찾을 수 있다', () => {
    //given
    const name = 'andy'
    const counter = 0
    interface IProps {
      name: string
    }
    interface IState {
      counter: number
    }
    class TestComponent extends Component<IProps, IState> {
      constructor(props: IProps, state: IState) {
        super(props, state)

        Object.setPrototypeOf(this, TestComponent.prototype)

        this.element = this.render()
      }
      render() {
        return div({ className: this.props.name })
      }
    }

    testComponent = new TestComponent({ name }, { counter })
    app.appendChild(testComponent.getElement())
    expect(testComponent.getState('counter')).toBe(counter)
    testComponent.setState('counter', 'wsd')
    expect(testComponent.getState('counter')).toBe(3)
  })
})
