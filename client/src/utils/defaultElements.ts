import { IAttribute, generateElement } from './generateElement'

const tagNames = ['div']

export const [
  div,
] = tagNames.map(
  (tagName) => (attributes: IAttribute, ...childNodes: HTMLElement[]) =>
    generateElement(tagName, attributes, ...childNodes)
)
