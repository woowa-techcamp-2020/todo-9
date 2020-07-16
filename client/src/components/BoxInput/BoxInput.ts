import { Component } from '../../utils/wooact'
import { input } from '../../utils/wooact/defaultElements'

interface IProps {
  placeholder: string
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
      props: { placeholder },
    } = this

    return input({
      className: 'box-input',
      placeholder,
    })
  }
}

export default BoxInput
