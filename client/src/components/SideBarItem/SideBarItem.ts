import { Component } from '../../utils/wooact'
import { div, img, span, q } from '../../utils/wooact/defaultElements'

interface IProps {}
interface IState {}

class SideBarItem extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  // constructor(props: IProps, state: IState) {
  //   super(props, state)
  constructor() {
    super()

    Object.setPrototypeOf(this, SideBarItem.prototype)
    this.init()
  }

  render() {
    return div(
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
  }
}

export default SideBarItem
