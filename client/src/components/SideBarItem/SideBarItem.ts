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

  getMethodName() {
    switch (this.props.method_type) {
      case 'add':
        return '추가'
      case 'update':
        return '수정'
      case 'delete':
        return '삭제'
      case 'move':
        return '이동'
    }
  }

  getName() {
    return this.props.type === 'kanban' ? '[컬럼]' : '[아이템]'
  }

  getTitle() {
    const { item_name: content } = this.props
    const TITLE_MAX_LENGTH = 12

    if (content.length < TITLE_MAX_LENGTH) {
      return content
    }

    if (content.includes('\n')) {
      const idx = content.indexOf('\n')
      return content.slice(0, idx)
    }

    return content.slice(0, TITLE_MAX_LENGTH) + '...'
  }

  getLog() {
    const {
      id,
      type,
      item_name,
      method_type,
      origin_name,
      target_name,
    } = this.props
    if (method_type === 'move') {
      return `${this.getName()} [${this.getTitle()}]이(가) [${origin_name}]에서 [${target_name}]으로 ${this.getMethodName()}되었습니당`
    }
    return `${this.getName()} [${this.getTitle()}]이(가) ${this.getMethodName()}되었습니당`
  }

  getTime() {
    const { created_at } = this.props
    const date = created_at.slice(0, 10)
    const time = created_at.slice(11, 19)
    return `${date} ${time}`
  }

  render() {
    return div(
      { className: 'log-item' },
      div({ className: 'vertical-bar' }),
      div(
        { className: 'log-contents-container' },
        div(
          {},
          div({
            className: 'content',
            textContent: this.getLog(),
          })
        ),
        div({ className: 'updatedAt', textContent: this.getTime() })
      )
    )
  }
}

export default SideBarItem
