import { Component } from './'

type TypeOfEvent = 'input'
type EventHandler = {
  [eventName in TypeOfEvent]?: (e?: Event) => void
}

export interface IAttribute
  extends Partial<
    HTMLElement &
      Element &
      EventHandler &
      HTMLDivElement &
      HTMLAnchorElement &
      HTMLParagraphElement &
      HTMLSpanElement &
      HTMLButtonElement &
      HTMLInputElement &
      HTMLFormElement &
      HTMLLabelElement &
      HTMLQuoteElement
  > {
  text?: string
  type?: string
  src?: string
}

export const generateElement = (
  tagName: string,
  attributes: IAttribute,
  ...childNodes: (HTMLElement | Component<any, any> | null)[]
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
      const event = key.includes('on') ? key.slice(2) : key
      newElement.addEventListener(event, value)
      continue
    }

    newElement.setAttribute(key, value)
  }

  // childNodes
  const fragment = document.createDocumentFragment()
  for (const node of childNodes) {
    if (node === null) {
      continue
    }
    // comopnent
    if (node instanceof Component) {
      fragment.appendChild(node.getElement())
      continue
    }

    fragment.appendChild(node)
  }
  newElement.appendChild(fragment)

  return newElement
}
