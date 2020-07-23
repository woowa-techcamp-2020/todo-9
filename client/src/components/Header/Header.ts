import { Component } from '../../utils/wooact'
import {
  header,
  div,
  span,
  button,
  input,
  a,
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
        { className: 'title-container' },
        //
        a({
          className: 'title-content',
          textContent: title,
          href: 'https://github.com/woowa-techcamp-2020/todo-9/',
        }),
        a({
          className: 'title-author',
          textContent: '홍동욱',
          href: 'https://github.com/doonguk',
        }),
        a({
          className: 'title-author',
          textContent: '남현우',
          href: 'https://github.com/naamoonoo',
        })
      ),
      button({
        className: 'f7-icons menu-container',
        textContent: 'menu',
        click: () => onToggleSideMenu(),
      })
    )
  }
}

export default Header
