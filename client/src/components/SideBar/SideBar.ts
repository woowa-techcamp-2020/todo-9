import { Component } from '../../utils/wooact'
import { aside, div, i, span, q, img } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class SideBar extends Component<IProps, IState> {
  constructor() {
    super()

    Object.setPrototypeOf(this, SideBar.prototype)
    this.init()
  }

  render() {
    return aside(
      { className: 'sidebar-container' },
      div(
        { className: 'icon-container' },
        div(
          { className: 'left-icon' },
          i({ className: 'f7-icons f7-icon', textContent: 'menu' }),
          span({ className: 'icon-title', textContent: 'Menu' })
        ),
        i({ className: 'f7-icons f7-icon', textContent: 'multiply' })
      ),
      div(
        { className: 'icon-container' },
        div(
          { className: 'left-icon' },
          i({ className: 'f7-icons f7-icon', textContent: 'bell_fill' }),
          span({ className: 'icon-title', textContent: 'Activity' })
        )
      ),
      // item 없는 경우 white-bg 설정
      div(
        { className: 'log-item' },
        img({
          className: 'bg-image',
          // src: '../../../public/images/woowabros.png',
          // alt: 'woowa-bros',
        }),
        div(
          { className: 'log-contents-container' },
          div(
            {},
            q({ className: 'author', textContent: '@donguk' }),
            span({ className: 'type', textContent: ' moved' }),
            span({
              className: 'content',
              textContent:
                ' js공부하고 복습하고 공부하고 복습하고 공부하고 또 복습하고 공부하고 테스트코드 짜고 복습하고 길게 쓰자',
            }),
            span({
              className: 'place',
              textContent: ' from 해야할일 to 하는중',
            })
          ),
          div({ className: 'updatedAt', textContent: '3minutes ago' })
        )
      ),
      div(
        { className: 'log-item' },
        img({
          className: 'bg-image',
          // src: '../../../public/images/woowabros.png',
          // alt: 'woowa-bros',
        }),
        div(
          { className: 'log-contents-container' },
          div(
            {},
            q({ className: 'author', textContent: '@donguk' }),
            span({ className: 'type', textContent: ' moved' }),
            span({
              className: 'content',
              textContent:
                ' js공부하고 복습하고 공부하고 복습하고 공부하고 또 복습하고 공부하고 테스트코드 짜고 복습하고 길게 쓰자',
            }),
            span({
              className: 'place',
              textContent: ' from 해야할일 to 하는중',
            })
          ),
          div({ className: 'updatedAt', textContent: '3minutes ago' })
        )
      )
    )
  }
}

export default SideBar
