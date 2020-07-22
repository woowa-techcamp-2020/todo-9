import { transform } from 'typescript'

let clicked: boolean = false
let target: HTMLElement = null
let cloned = null
const position = { x: 0, y: 0 }
let overlappedElement = { item: null, column: null }

let originalLeft = null
let originalTop = null

const onMouseDown = (e: MouseEvent) => {
  target = (e.target as HTMLElement).closest('.item-wrapper')
  if (!target) {
    return
  }

  clicked = true

  cloned = target.cloneNode(true)
  target.classList.add('temp')
  const { pageX, pageY } = e

  position.x = target.offsetLeft - pageX
  position.y = target.offsetTop - pageY

  const floatingItem = document.querySelector('.float-item') as HTMLElement

  floatingItem.style.left = e.pageX + position.x + 'px'
  floatingItem.style.top = e.pageY + position.y + 'px'
  cloned.classList.add('item-wrapper')
  floatingItem.appendChild(cloned)
}

const onMouseUp = (e: MouseEvent) => {
  if (!clicked) {
    return
  }
  const { pageX, pageY } = e

  // if has something overlapped
  swapIfOverlappedWithItem()
  moveToOtherColumn()

  resetToDefault()
}

const onMouseMove = (e: MouseEvent) => {
  if (!clicked) {
    return
  }

  const floatingItem = document.querySelector('.float-item') as HTMLElement

  const { pageX, pageY } = e
  floatingItem.style.left = pageX + position.x + 'px'
  floatingItem.style.top = pageY + position.y + 'px'

  //   document
  //     .querySelectorAll('.item-wrapper.overlapped')
  //     .forEach((item) => item.classList.remove('overlapped'))
  resetOverlapped()
  findOverlappedItem(e)
  findOverlappedColumn(e)

  // swap element
  //   const overlappedPostion = overlapped.getBoundingClientRect()
  //   console.log(overlappedPostion.top, pageX)
  //   if (overlappedPostion.top > pageX) {
  //     ;(overlapped as HTMLElement).style.top = overlappedPostion.top + 30 + 'px'
  //     target.style.top = target.style.top - 30 + 'px'
  //   }
}

const resetOverlapped = () => {
  if (overlappedElement.item) {
    overlappedElement.item.classList.remove('overlapped')
    overlappedElement.item = null
  }
  if (overlappedElement.column) {
    overlappedElement.column.classList.remove('overlapped')
    overlappedElement.column = null
  }
}

const swapIfOverlappedWithItem = () => {
  if (!overlappedElement.item) {
    return
  }
  const overlappedPostion = overlappedElement.item.getBoundingClientRect()
  const targetPostion = target.getBoundingClientRect()

  if (overlappedPostion.top < targetPostion.top) {
    overlappedElement.item.insertAdjacentElement('beforebegin', target)
  } else {
    overlappedElement.item.insertAdjacentElement('afterend', target)
  }
}

const moveToOtherColumn = () => {
  if (overlappedElement.item || !overlappedElement.column) {
    return
  }

  const container = document.querySelector('.column-items-container')
  console.log(container)
  container.appendChild(target)
}

const findOverlappedItem = (e: MouseEvent) => {
  const elements = document.elementsFromPoint(e.pageX, e.pageY)
  const [overlappedItem, ..._] = elements.filter(
    (item) =>
      item !== cloned &&
      item !== target &&
      item.classList.contains('item-wrapper')
  )

  overlappedElement.item = overlappedItem
  if (!overlappedElement.item) {
    return
  }

  overlappedElement.item.classList.add('overlapped')
}

const findOverlappedColumn = (e: MouseEvent) => {
  const elements = document.elementsFromPoint(e.pageX, e.pageY)
  const [overlappedColumn, ..._] = elements.filter(
    (item) =>
      item.classList.contains('column-container') &&
      item.id !== target.parentElement.id
  )

  overlappedElement.column = overlappedColumn
  if (!overlappedColumn) {
    return
  }

  console.log(`has overlapped column`)

  //   overlapped.classList.add('overlapped')
}

const resetToDefault = () => {
  clicked = false
  if (target) {
    target.classList.remove('temp')
  }
  if (cloned) {
    cloned.remove()
  }

  target = null
  cloned = null
  originalLeft = null
  originalTop = null
  resetOverlapped()
}
window.addEventListener('pointerdown', onMouseDown)
window.addEventListener('pointerup', onMouseUp)
window.addEventListener('pointermove', onMouseMove)
