import { Component } from '../../utils/wooact'
import { input, textarea, p } from '../../utils/wooact/defaultElements'

interface IProps {
  initialValue: string
  placeholder: string
  // onChangeHandler: (e: InputEvent) => void
}
interface IState {}

class BoxInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, BoxInput.prototype)
    this.init()
  }

  onChange(e) {
    const { value } = e.target as HTMLTextAreaElement

    const submitBtn = document.querySelector(
      '.btn.positive'
    ) as HTMLTextAreaElement

    if (!value || value.length === 0) {
      submitBtn.classList.remove('submit-able')
      return
    }
    submitBtn.classList.add('submit-able')
  }

  render() {
    const {
      props: { initialValue, placeholder },
    } = this
    const rows = initialValue
      ? (initialValue.split('\n').length + 1).toString()
      : '3'
    return textarea({
      className: 'box-input',
      type: 'textaea',
      rows,
      placeholder,
      textContent: initialValue,
      autofocus: true,
      oninput: (e) => this.onChange(e),
    })
  }
}

export default BoxInput
