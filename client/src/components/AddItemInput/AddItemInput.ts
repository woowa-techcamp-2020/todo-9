import { Component } from '../../utils/wooact'
import { div } from '../../utils/wooact/defaultElements'
import { BoxButton } from '../BoxButton'
import { BoxInput } from '../BoxInput'
import { updateItem, createItem } from '../../apis/item'
import { createLog } from '../../apis/log'

interface IProps {
  toggleAddItemInput: () => void
  userId?: number
  kanbanId?: number
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
    const { itemId, kanbanId } = this.props
    const inputElement = this.element.querySelector(
      '.box-input'
    ) as HTMLTextAreaElement
    const content = inputElement.value
    if (itemId) {
      await updateItem({ id: itemId, content })
    } else {
      await createItem({ kanbanId: kanbanId, content })
    }
    await window.dispatchEvent(new Event('item_changed'))
  }

  render() {
    const inputBox = new BoxInput({
      initialValue: this.props.initialValue || '',
      placeholder: 'Enter a note',
    })

    const addButton = new BoxButton({
      type: 'positive',
      buttonText: this.props.itemId ? 'Update' : 'Add',
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
