import { Component } from '../utils/Component'

interface IProps {
  name: string
}

interface IState {
  age: number
}

export class Header extends Component<IProps, IState> {
  constructor() {
    super()
  }

  render() {}
}
