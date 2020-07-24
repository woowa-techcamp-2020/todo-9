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
import { createUser, IUser } from '../../apis/user'
import { KEY_NAME } from '../../utils/constants'

interface IProps {
  users: IUser[]
  onSelectUser: (userId: number) => void
}
interface IState {}

class UserModal extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, UserModal.prototype)
    this.init()
  }

  onKeyUpInput(e) {
    if (e.key !== KEY_NAME.ENTER || !e.target.value.trim()) {
      return
    }
    this.onSubmit(e.target.value.trim())
  }

  async onClickButton(e) {
    const $target = e.target as HTMLElement
    const $input = $target.previousElementSibling as HTMLInputElement

    if (!$input.value.trim()) {
      alert('고갱님 이름을 입력해주세요.')
      return
    }
    this.onSubmit($input.value.trim())
  }

  async onSubmit(name: string) {
    const { insertId } = await createUser({ name })
    this.props.onSelectUser(insertId)
  }

  renderUser() {
    return this.props.users.map(({ id, name }) => {
      return li(
        {
          id,
          className: 'user-item',
          onclick: () => this.props.onSelectUser(Number(id)),
        },
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
          h2({ className: 'title', textContent: '우와한 사람들' })
        ),
        ul({ className: 'user-list' }, ...this.renderUser()),
        input({
          className: 'user-input',
          type: 'text',
          placeholder: '고갱님 성함을 입력해주세요 :) ',
          onkeyup: (e) => this.onKeyUpInput(e),
        }),
        button({
          className: 'submit',
          type: 'button',
          textContent: '우와할 준비 되었습니당',
          onclick: (e) => this.onClickButton(e),
        })
      )
    )
  }
}

export default UserModal
