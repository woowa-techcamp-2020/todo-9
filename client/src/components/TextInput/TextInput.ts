import { Component } from '../../utils/wooact'
import { input } from '../../utils/wooact/defaultElements'
import { KEY_NAME } from '../../utils/constants'
import { updateKanbanName } from '../../apis/kanban'

interface IProps {
  value: string
  onVisible: () => void
}
interface IState {}

class TextInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, TextInput.prototype)
    this.init()
  }

  onKeyUpHandler = async (e) => {
    if (e.key === KEY_NAME.ESC) {
      this.props.onVisible()
      return
    }
    if (e.key !== KEY_NAME.ENTER) {
      return
    }
    if (e.target.value.trim().length > 0)
      try {
        // await updateKanbanName(1,{name: e.target.value.trim()})
      } catch (e) {
        console.error(e)
      }
  }

  componentDidMount() {
    const $target = this.getElement() as HTMLElement
    $target.selectionStart = this.props.value.length // 글자 마지막에 커서
  }

  render() {
    return input({
      className: 'input-wrapper',
      autofocus: true,
      value: this.props.value,

      onblur: () => this.props.onVisible(),
      onkeydown: (e) => this.onKeyUpHandler(e),
    })
  }
}

export default TextInput
