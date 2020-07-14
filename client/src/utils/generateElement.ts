const eventTypes = ['click', 'input'] as const

type TypeOfEvent = typeof eventTypes[number]
type EventHandler = {
  [eventName in TypeOfEvent]?: (e: Event) => void
}
export interface IAttribute extends Partial<Element>, EventHandler {}

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

    // event
    newElement.setAttribute(key, value)
  }

  // childNodes
  const fragment = document.createDocumentFragment()
  for (const node of childNodes) {
    fragment.appendChild(node)

    // comopnent

    // generaterEle
  }
  newElement.appendChild(fragment)

  return newElement
}
