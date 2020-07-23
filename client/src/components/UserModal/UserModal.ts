import { Component } from '../../utils/wooact'
import {
  div,
  ul,
  li,
  input,
  h2,
  span,
  i,
  button,
} from '../../utils/wooact/defaultElements'
import { IUser } from '../../apis/user'

interface IProps {
  users: IUser[]
}
interface IState {}

class UserModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, UserModal.prototype)
    this.init()
  }

  renderUser() {
    return this.props.users.map(({ id, name }) => {
      return li(
        { id, className: 'user-item' },
        i({ className: 'f7-icons user-icon', textContent: 'person' }),
        span({ className: 'name', textContent: name })
      )
    })
  }

  render() {
    return div(
      { className: 'gray-bg' },
      div(
        { className: 'modal-wrapper' },
        div(
          { className: 'user-list-header' },
          span({
            className: 'total-count',
            textContent: String(this.props.users.length),
          }),
          h2({ className: 'title', textContent: '사용자 목록' })
        ),
        ul({ className: 'user-list' }, ...this.renderUser()),
        input({
          className: 'user-input',
          type: 'text',
          placeholder: '이름을 입력해주세요!',
        }),
        button({ className: 'submit', type: 'button', textContent: '로그인' })
      )
    )
  }
}

export default UserModal
