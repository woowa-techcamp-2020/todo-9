import { fireEvent } from '@testing-library/dom'
import { generateElement } from '../generateElement'
import { div } from '../defaultElements'

describe('[generateElement]', () => {
  test('div 태그를 넣고 생성하면, div엘리먼트를 제대로 생성해야한다', () => {
    const tagName = 'div'
    const $newElement = generateElement(tagName, { className: '' })

    expect($newElement instanceof HTMLDivElement).toBeTruthy()
    expect($newElement.tagName).toEqual(tagName.toUpperCase())
  })

  test('두번째 인자로 받는 attribute 중에, className는 항상 존재해야 한다', () => {
    //given
    const tagName = 'div'
    const className = 'block'

    // when
    const $newElement = generateElement(tagName, { className })

    // then
    expect($newElement.className).not.toBe('')
    expect($newElement.className).toBe(className)
  })

  test('두번째 인자 attribute에 text값을 받으면 text노드를 렌더링한다.', () => {
    // given
    const text = 'test'

    // when
    const $newElement = generateElement('div', {
      className: '',
      textContent: text,
    })

    // then
    expect($newElement.textContent).toBe(text)
    // 더 고민해보기
  })

  test('attribute로 이벤트와 이벤트 리스너를 받으면 element에 해당 이벤트를 바인딩한다.', () => {
    const eventName = 'click'
    const eventHandler = (e) => (e.currentTarget.dataset.isSuccess = true)

    const $newElement = generateElement('div', {
      className: '',
      [eventName]: eventHandler,
    })

    expect($newElement.dataset.isSuccess).toBeFalsy() // false인지 체크한다.
    fireEvent($newElement, new MouseEvent('click'))
    expect($newElement.dataset.isSuccess).toBeTruthy()
  })

  test('세번째 인자로 받는 child는, 해당 엘리먼트의 자식 노드로 존재해야 한다', () => {
    //given
    const $childElement = generateElement('p', {})

    // when
    const $parentElement = div({}, $childElement)

    // then
    expect($parentElement.hasChildNodes()).toBe(true)
    const childNodes = Array.from($parentElement.childNodes)
    expect(childNodes.length).toBe(1)

    const childNode = $parentElement.childNodes[0] as HTMLElement
    expect(childNode.tagName).toBe('P')
  })

  test('세번째 인자로 받은 child가 generateELement function이면 함수를 실행하여 자식으로 append한다.', () => {
    const $newElement = div(
      { className: 'parent' },
      div({ className: 'child' })
    )
  })
})
