import { div } from './defaultElements'

type PartialElemet = Partial<Element>

export interface IAttribute extends PartialElemet {
  className: string
}

export const generateElement = (
  tagName: string,
  attributes: IAttribute,
  ...childNodes: HTMLElement[]
) => {
  const $element = document.createElement(tagName)

  // attribute를 element한테 잘 붙여주면 댐
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'className') {
      $element.setAttribute('class', value)
      continue
    }
    //text

    //event
    $element.setAttribute(key, value)
  }

  // childNodes
  for (const node of childNodes) {
    $element.appendChild(node)

    //comopnent

    // generaterEle
  }

  return $element
}
