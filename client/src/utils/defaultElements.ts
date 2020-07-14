import { IAttribute, generateElement } from './generateElement'

const tagNames = ['div', 'p']

export const [
  div,
  p,
] = tagNames.map(
  (tagName) => (attributes: IAttribute, ...childNodes: HTMLElement[]) =>
    generateElement(tagName, attributes, ...childNodes)
)
