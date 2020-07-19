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
    console.log(this.element)
    console.log(this.element.style)
    console.log(this.element.style.height)
    if (this.element.classList.contains('close')) {
      console.log(this.element.style.height)
      this.element.classList.add('close')
      // this.element.hidden = false
      return
    }
    // this.element.hidden = true
    this.element.classList.add('close')
    // element.style.transform = '200px'
    // this.getElement().remove()
  }

  render() {
    console.log('reendered')
    const inputBox = new BoxInput({
      value: this.getState('inputText'),
      placeholder: 'Enter a note',
      // onChangeHandler: (e: InputEvent) => this.onChangeHandler(e),
    })

    const addButton = new BoxButton({
      type: 'positive',
      buttonText: 'Add',
      onClickHandler: () => {
        openModal('hello')
      },
      // disabed: this.getState('inputText').length === 0 || false,
    })
    const cancelButton = new BoxButton({
      buttonText: 'Cancel',
      onClickHandler: () => this.onClickCancel(),
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
