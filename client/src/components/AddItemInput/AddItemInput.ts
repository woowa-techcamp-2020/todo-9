import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { BoxButton } from '../BoxButton'
import { BoxInput } from '../BoxInput'
import { Modal } from '../Modal'
import { openModal } from '../../utils/eventsHandler/openModal'
interface IProps {
  toggleAddItemInput: () => void
}
interface IState {
  inputText: string
}

class AddItemInput extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  constructor(props: IProps, state: IState) {
    super(props, state)
    // constructor() {
    //   super()

    Object.setPrototypeOf(this, AddItemInput.prototype)
    this.init()
  }

  onChangeHandler(event: InputEvent) {
    const target = event.target as HTMLInputElement
    this.setState('inputText', target.value)
  }

  onClickCancel() {
    const element = this.getElement()
    element.classList.add('close')
    // element.style.transform = '200px'
    // this.getElement().remove()
  }

  render() {
    console.log(this.getElement())
    const inputBox = new BoxInput({
      value: this.getState('inputText'),
      placeholder: 'Enter a note',
      onChangeHandler: (e: InputEvent) => this.onChangeHandler(e),
    })

    const addButton = new BoxButton({
      type: 'positive',
      buttonText: 'Add',
      onClickHandler: () => this.onClickCancel(),
      // disabed: this.getState('inputText').length === 0 || false,
    })
    const cancelButton = new BoxButton({
      buttonText: 'Cancel',
      onClickHandler: () => openModal('hello'),
    })

    return div(
      { className: 'add-input-container' },
      inputBox,
      div(
        {
          className: 'buttons-container',
        },
        addButton,
        cancelButton
      )
    )
  }
}

export default AddItemInput
