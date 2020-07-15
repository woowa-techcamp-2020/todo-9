import { Component } from '../../utils/wooact'
import { header, div, span, button } from '../../utils/wooact/defaultElements'
import './header.scss'

interface IProps {
  title: string
  onClickMenu: () => void
}

interface IState {}

class Header extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, Header.prototype)
    this.init()
  }

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

export default Header
