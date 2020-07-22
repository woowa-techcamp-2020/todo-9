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
