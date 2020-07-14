export abstract class Component<P, S> {
  protected element: HTMLElement

  constructor(public props?: P, private state?: S) {
    const { setState, getState, ...prototypeOfComopnent } = Component.prototype

    // if (state) {
    //   this.setState = this.setState.bind(this)
    //   this.getState = this.getState.bind(this)
    // }
    // Object.setPrototypeOf(this, prototypeOfComopnent)
    Object.setPrototypeOf(this, Component.prototype)
  }

  getElement() {
    return this.element
  }

  reRender() {
    const oldElement = this.element
    const newElement = this.render()
    this.element.replaceWith(newElement)
    this.element = newElement
    oldElement.remove()
  }

  setState(key: keyof S, value: any) {
    if (!this.state) {
      return
    }

    if (typeof this.state[key] !== typeof value) {
      return
    }

    this.state[key] = value
    this.reRender()
  }

  getState(key: keyof S) {
    if (!this.state) {
      return
    }

    return this.state[key]
  }

  init() {
    this.element = this.render()
    // this.componentDidMount()
  }
  abstract render?()
  //   abstract componentDidMount?()
}
