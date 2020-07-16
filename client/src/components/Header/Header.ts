import { Component } from '../../utils/wooact'
import {
  header,
  div,
  span,
  button,
  input,
} from '../../utils/wooact/defaultElements'

interface IProps {
  title: string
  onToggleSideMenu: () => void
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
      props: { title, onToggleSideMenu },
    } = this

    return header(
      { className: 'header-container' },
      div(
        { className: 'title-container', click: () => alert('개발예정') },
        span({ className: 'title-content', textContent: title })
      ),
      button({
        className: 'menu-container',
        textContent: 'menu',
        click: () => onToggleSideMenu(),
      })
    )
  }
}

export default Header
