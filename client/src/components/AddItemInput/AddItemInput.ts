import { Component } from '../../utils/wooact'
import { div, input } from '../../utils/wooact/defaultElements'
import { BoxButton } from '../BoxButton'
import { BoxInput } from '../BoxInput'
import { Modal } from '../Modal'
import { openModal } from '../../utils/eventsHandler/openModal'
import { createUser } from '../../apis/user'
interface IProps {
  toggleAddItemInput: () => void
}
interface IState {
  // inputText: string
}

class AddItemInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    // constructor(props: IProps, state: IState) {
    // super(props, state)
    // constructor() {
    //   super()

    Object.setPrototypeOf(this, AddItemInput.prototype)
    this.init()
  }

  onChangeHandler(event: InputEvent) {
    const target = event.target as HTMLInputElement
  }

  async onUserAdd(e: Event) {
    // console.log(e.target)
    // const inputElement = (e.target as HTMLElement).closest(
    //   'textarea'
    // ) as HTMLTextAreaElement
    const inputElement = this.element.querySelector('textarea')
    console.log(inputElement)
    const name = inputElement.value
    console.log(name)
    const newUser = await createUser({ name })
    console.log(newUser)
  }
  // onClickCancel() {
  //   if (this.element.classList.contains('close')) {
  //     this.element.classList.add('close')
  //     return
  //   }
  //   this.element.classList.remove('close')
  // }

  render() {
    console.log('reendered')
    const inputBox = new BoxInput({
      // value: this.getState('inputText'),
      value: '',
      placeholder: 'Enter a note',
    })

    const addButton = new BoxButton({
      type: 'positive',
      buttonText: 'Add',
      onClickHandler: (e: Event) => this.onUserAdd(e),
      // disabed: this.getState('inputText').length === 0 || false,
    })
    const cancelButton = new BoxButton({
      buttonText: 'Cancel',
      onClickHandler: () => this.props.toggleAddItemInput(),
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
