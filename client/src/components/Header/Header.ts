import { Component } from '../../utils/Component'
import { header, div, span, button } from '../../utils/defaultElements'
import { textSpanIntersectsWithTextSpan } from 'typescript'
import './header.css'

interface IProps {
  title: string
  onClickMenu: () => void
}

interface IState {}

export class Header extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, Header.prototype)
    this.init()
  }

  // onClickMenu() {
  //   this.setState('menuVisible', !this.getState('menuVisible'))
  // }

  render() {
    const {
      props: { title, onClickMenu },
    } = this

    return header(
      {},
      div(
        { className: 'title-container' },
        span({ className: 'title-content', textContent: title })
      ),
      button({
        className: 'menu-container',
        textContent: 'menu',
        click: () => onClickMenu(),
      })
    )
  }
}
