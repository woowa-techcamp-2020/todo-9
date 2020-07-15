import { Component } from './Component'

export default class NeactDom {
  static render(element: Component<any, any>, container: HTMLElement) {
    container.appendChild(element.getElement())
  }
}
