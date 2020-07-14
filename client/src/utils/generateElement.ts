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
  ...childNodes: Array<HTMLElement | Function>
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

    // generaterElement
    if (typeof node === 'function') {
      console.log(node)
      const childNode = node()
      fragment.appendChild(childNode)
      continue
    }

    newElement.appendChild(node)
  }
  newElement.appendChild(fragment)

  return newElement
}
