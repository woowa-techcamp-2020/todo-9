export abstract class Component<P = {}, S = {}> {
  // 여기 default값 줬어 형
  protected element: HTMLElement

  constructor(public props?: P, private state?: S) {
    Object.setPrototypeOf(this, Component.prototype)
  }

  getElement(): HTMLElement {
    return this.element
  }

  private reRender() {
    const oldElement = this.element
    const newElement = this.render()
    this.element.replaceWith(newElement)
    this.element = newElement
    oldElement.remove()
  }

  protected setState(key: keyof S, value: S[keyof S]) {
    if (!this.state) {
      return
    }

    this.state[key] = value
    this.reRender()
  }

  protected getState(key: keyof S) {
    if (!this.state) {
      return
    }

    return this.state[key]
  }

  protected init() {
    this.element = this.render()
    // this.componentDidMount()
  }

  protected abstract render?()
  protected abstract componentDidMount?()
}
