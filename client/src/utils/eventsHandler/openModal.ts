import { Modal } from '../../components/Modal'
import { BoxInput } from '../../components/BoxInput'
import { BoxButton } from '../../components/BoxButton'

export const openModal = (
  title: string,
  boxInput?: BoxInput,
  boxButtons?: BoxButton[]
) => {
  const app = document.querySelector('#App')
  const modal = new Modal({
    title,
    boxInput,
    boxButtons,
  })
  app.appendChild(modal.getElement())
}
