import { Component } from '../../utils/wooact'
import { input, textarea, p } from '../../utils/wooact/defaultElements'

interface IProps {
  value: string
  placeholder: string
  onChangeHandler: (e: InputEvent) => void
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
      props: { value, placeholder, onChangeHandler },
    } = this

    return textarea({
      className: 'box-input',
      type: 'textaea',
      rows: '3',
      placeholder,
      oninput: onChangeHandler,
      textContent: value,
      autofocus: true,
    })
  }
}

export default BoxInput
