import { Component } from '../../utils/wooact'
import { input, div, i } from '../../utils/wooact/defaultElements'
import { KEY_NAME } from '../../utils/constants'
import { createKanban } from '../../apis/kanban'

interface IProps {
  value: string
  onToggleChangeNameInput?: () => void
  onSubmitChangeName?: (value: string) => void
  onSubmitAddKanban?: (value: string) => void
}
interface IState {}

class TextInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, TextInput.prototype)
    this.init()
  }

  async onKeyDownHandler(e) {
    if (e.key === KEY_NAME.ESC) {
      this.getElement().style.display = 'none'
      return
    }

    if (e.key !== KEY_NAME.ENTER || !e.target.value.trim().length) {
      return
    }

    if (this.getElement().dataset.type === 'add') {
      const { userId } = e.target.dataset
      await createKanban({ userId, name: e.target.value })
      window.dispatchEvent(new Event('item_changed'))
      return
    }

    try {
      await this.props.onSubmitChangeName(e.target.value.trim())
      window.dispatchEvent(new Event('item_changed'))
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    const $target = this.getElement() as HTMLInputElement
    $target.selectionStart = this.props.value.length // 글자 마지막에 커서
  }

  render() {
    return div(
      { className: 'input-container' },
      input({
        className: 'input-wrapper',
        autofocus: true,
        value: this.props.value,

        onblur: () => this.props.onToggleChangeNameInput(),
        onkeydown: (e) => this.onKeyDownHandler(e),
      })
      // i()
    )
  }
}

export default TextInput
