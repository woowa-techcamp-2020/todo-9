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
    })
  }
}

export default BoxInput
