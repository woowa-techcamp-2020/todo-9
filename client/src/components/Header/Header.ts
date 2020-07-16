import { Component } from '../../utils/wooact'
import { header, div, span, button } from '../../utils/wooact/defaultElements'

interface IProps {
  title: string
  toggleSideMenu: () => void
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
      props: { title, toggleSideMenu },
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
        click: () => toggleSideMenu(),
      })
    )
  }
}

export default Header
