import { generateElement } from '../generateElement'
import { div } from '../defaultElements'

// let counter
// let counterInstance
// let app = null

// beforeAll(() => {
//   document.body.innerHTML = '<div id="Test">' + '</div>'
//   app = document.querySelector('#Test')
// })

// beforeEach(() => {
//   counter = counterInstance.component

//   app.append(counter)
// })

// afterEach(() => {
//   counter.remove()
// })

// afterAll(() => {
//   app.remove()
// })

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

  test('세번째 인자로 받는 child는, 해당 엘리먼트의 자식 노드로 존재해야 한다', () => {
    //given
    const $childElement = generateElement('p', { className: '' })
    // const $parentElement = generateElement(
    //   'div',
    //   { className: '' },
    //   $childElement
    // )
    const $parentElement = div({ className: '' }, div({ className: '' }))

    // when

    // then
    expect($parentElement.hasChildNodes()).toBe(true)
    const childNodes = Array.from($parentElement.childNodes)
    expect(childNodes.length).toBe(1)
    const childNode = $parentElement.childNodes[0] as HTMLElement
    expect(childNode.tagName).toBe('P')
  })
  // test('has three child', () => {
  //   expect(counter.hasChildNodes()).toBeTruthy()
  //   expect(counter.childElementCount).toBe(3)
  // })

  // test('has button element, with id minus-button', () => {
  //   const minusButton = document.querySelector('#minus-button')
  //   expect(counter.contains(minusButton)).toBeTruthy()
  //   expect(minusButton.parentNode === counter).toBeTruthy()
  //   expect(minusButton.textContent).toMatch('-')
  // })

  // test('has button element, with id plus-button', () => {
  //   const plusButton = document.querySelector('#plus-button')
  //   expect(counter.contains(plusButton)).toBeTruthy()
  //   expect(plusButton.parentNode === counter).toBeTruthy()
  //   expect(plusButton.textContent).toMatch('+')
  // })

  // test('has p element, with id counter-text', () => {
  //   const counterText = document.querySelector('#counter-text')
  //   expect(counter.contains(counterText)).toBeTruthy()
  //   expect(counterText.textContent).toBe(props.initialCount.toString())
  // })

  // test('[onclick] event handler', () => {
  //   const minusButton = document.querySelector('#minus-button')
  //   const plusButton = document.querySelector('#plus-button')
  //   clickSimulator(minusButton)
  //   expect(counterInstance.getState('counter')).toBe(-1)
  //   clickSimulator(plusButton)
  //   expect(counterInstance.getState('counter')).toBe(0)
  //   const counterText = document.querySelector('#counter-text')
  //   expect(counterText.textContent).toBe('0')
  // })
})
