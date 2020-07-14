import { IAttribute, generateElement } from './generateElement'

const tagNames = ['div', 'p'] as const

export const [
  div,
  p,
] = tagNames.map(
  (tagName) => (
    attributes: IAttribute,
    ...childNodes: Array<HTMLElement | Function>
  ) => generateElement(tagName, attributes, ...childNodes)
)

// <div>
// {itemList.map(itme => <Item prop={itme}/>)}
// </div>

div({})
