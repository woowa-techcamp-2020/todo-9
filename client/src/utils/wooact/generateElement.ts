import { Component } from './'

type TypeOfEvent = 'click' | 'input'
type EventHandler = {
  [eventName in TypeOfEvent]?: (e?: Event) => void
}

export interface IAttribute extends Partial<Element>, EventHandler {
  text?: string
  type?: string
  src?: string
}

export const generateElement = (
  tagName: string,
  attributes: IAttribute,
  ...childNodes: HTMLElement[] | Component<any, any>[]
) => {
  const newElement = document.createElement(tagName)

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      newElement.setAttribute('class', value)
      continue
    }

    // text
    if (key === 'textContent') {
      const textNode = document.createTextNode(value)
      newElement.appendChild(textNode)
      continue
    }

    // event
    if (typeof value === 'function') {
      newElement.addEventListener(key, value)
      continue
    }

    newElement.setAttribute(key, value)
  }

  // childNodes
  const fragment = document.createDocumentFragment()
  for (const node of childNodes) {
    // comopnent
    if (node instanceof Component) {
      fragment.appendChild(node.getElement())
      continue
    }

    newElement.appendChild(node)
  }
  newElement.appendChild(fragment)

  return newElement
}
