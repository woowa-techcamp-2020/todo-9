import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { BoxButton } from '../BoxButton'
import { BoxInput } from '../BoxInput'
import { updateItem, createItem } from '../../apis/item'

interface IProps {
  toggleAddItemInput: () => void
  itemId?: number
  initialValue?: string
}
interface IState {
  // inputText: string
}

class AddItemInput extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, AddItemInput.prototype)
    this.init()
  }

  async onSubmit(e: Event) {
    // 흐어어엉왜 안대지
    const { itemId, initialValue } = this.props
    const inputElement = this.element.querySelector(
      '.box-input'
    ) as HTMLTextAreaElement
    const content = inputElement.textContent
    if (itemId && initialValue) {
      updateItem({ id: itemId, content })
    } else {
      createItem(content)
    }
  }

  render() {
    const inputBox = new BoxInput({
      value: this.props.initialValue,
      placeholder: 'Enter a note',
    })

    const addButton = new BoxButton({
      type: 'positive',
      buttonText: this.props.initialValue ? 'Update' : 'Add',
      onClickHandler: (e: Event) => this.onSubmit(e),
      // disabed: this.getState('inputText').length === 0 || false,
    })
    const cancelButton = new BoxButton({
      buttonText: 'Cancel',
      onClickHandler: () => this.props.toggleAddItemInput(),
    })

    return div(
      { className: 'add-input-container' },
      div({ className: 'input-container' }, inputBox),
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
