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
  ...childNodes: (HTMLElement | Component<any, any> | undefined)[]
) => {
  const newElement = document.createElement(tagName)
  if (tagName === 'aside') {
    console.log('rendered')
  }

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
    if (node === undefined) {
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
