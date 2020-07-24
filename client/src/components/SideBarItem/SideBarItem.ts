import { Component } from '../../utils/wooact'
import { ILog, getLogs } from '../../apis/log'
import { div, img, span, q } from '../../utils/wooact/defaultElements'

interface IProps extends ILog {}
interface IState {}

//   type: 'item' | 'kanban'
// methodType: MethodTpyeOfItemLog
// originName?: string
// targetName?: string
// itemName?: string
class SideBarItem extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    Object.setPrototypeOf(this, SideBarItem.prototype)
    this.init()
  }

  getKanbanLog() {
    const {
      id,
      type,
      methodType,
      originName,
      targetName,
      itemName,
    } = this.props

    return `[${type}] ${itemName}이 ${
      methodType === 'add' ? '추가' : '삭제'
    } 되었습니당`
  }

  getLog() {
    const {
      id,
      type,
      methodType,
      originName,
      targetName,
      itemName,
    } = this.props
    if (type === 'kanban') {
      return this.getKanbanLog()
    }
  }

  render() {
    const {
      id,
      type,
      methodType,
      originName,
      targetName,
      itemName,
    } = this.props

    console.log(type, itemName)
    return div(
      { className: 'log-item' },
      div({ className: 'vertical-bar' }),
      div(
        { className: 'log-contents-container' },
        div(
          {},
          q({ className: 'author', textContent: '@donguk' }),
          span({ className: 'type', textContent: ' moved' }),
          span({
            className: 'content',
            textContent:
              ' js공부하고 복습하고 공부하고 복습하고 공부하고 또 복습하고 공부하고 테스트코드 짜고 복습하고 길게 쓰자',
          }),
          span({
            className: 'place',
            textContent: ' from 해야할일 to 하는중',
          })
        ),
        div({ className: 'updatedAt', textContent: '3minutes ago' })
      )
    )
  }
}

export default SideBarItem
