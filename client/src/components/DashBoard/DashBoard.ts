import { Component } from '../../utils/wooact'
import { main, ul } from '../../utils/wooact/defaultElements'
import { Column } from '../Column'
import { ColumnAddButton } from '../ColumnAddButton'
import { getKanbans, IKanban } from '../../apis/kanban'

interface IProps {
  userId: number
}
interface IState {
  kanbans: IKanban[]
}

class DashBoard extends Component<IProps, IState> {
  // constructor(props: IProps) {
  // super(props)
  constructor(props: IProps, state: IState) {
    super(props, state)
    // constructor() {
    //   super()

    Object.setPrototypeOf(this, DashBoard.prototype)
    this.init()
  }

  async componentDidMount() {
    const kanbans = await getKanbans(this.props.userId)
    this.setState('kanbans', kanbans)
  }

  renderKanbans() {
    const kanbans = this.getState('kanbans')
    if (!kanbans || kanbans.length === 0) {
      return [null]
    }

    // const kanbans: IKanban[] = [
    //   {
    //     id: 1,
    //     name: '할 일',
    //     userName: 'andy',
    //     items: [
    //       { id: 1, content: '이거는 해야징!!!!!!!!!!!!!!!!!!!!!!!!!' },
    //       { id: 2, content: '뀨뀨뀨뀨뀨뀨뀨뀨뀨뀨ㅠㄲ뀨ㅠ꺼주러ㅜㄴ이룬ㅇㄹ' },
    //     ],
    //   },
    //   {
    //     id: 2,
    //     name: '하고있는 일',
    //     userName: 'andy',
    //     items: [
    //       { id: 3, content: '하고있는 중임니당' },
    //       {
    //         id: 4,
    //         content: 'ㅓㅁㅈ두리ㅏㅜ미ㅏㄴ우리ㅏㅜ미아누리ㅏㅁㅇ누리ㅏㅜㅁㄴㅇ',
    //       },
    //     ],
    //   },
    // ]
    return kanbans.map(
      (kanban) => new Column({ ...kanban }, { showInput: false })
    )
  }

  render() {
    return main(
      {},
      ul(
        { className: 'main-container' },
        ...this.renderKanbans(),
        new ColumnAddButton()
      )
    )
  }
}

export default DashBoard
