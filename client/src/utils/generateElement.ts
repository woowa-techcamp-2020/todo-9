type TypeOfEvent = 'click' | 'input'
type EventHandler = {
  [eventName in TypeOfEvent]?: (e: Event) => void
}
export interface IAttribute extends Partial<Element>, EventHandler {
  text?: string
}

export const generateElement = (
  tagName: string,
  attributes: IAttribute,
  ...childNodes: HTMLElement[]
) => {
  const newElement = document.createElement(tagName)

  // attribute를 element한테 잘 붙여주면 댐
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
    newElement.appendChild(node)

    // comopnent

    // generaterElement
  }
  newElement.appendChild(fragment)

  return newElement
}
