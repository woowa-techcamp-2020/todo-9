import { transform } from 'typescript'

const position = { x: 0, y: 0 }
let clicked: boolean = false
let target: HTMLElement = null
let cloned = null
let overlappedElement = { item: null, column: null }
let isOnTop: boolean = false

const setFloatingItem = (e: MouseEvent, init: boolean = false) => {
  const { pageX, pageY } = e

  const floatingItem = document.querySelector('.float-item') as HTMLElement

  floatingItem.style.left = pageX + position.x + 'px'
  floatingItem.style.top = pageY + position.y + 'px'

  if (init) {
    floatingItem.appendChild(cloned)
  }
  return floatingItem
}

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

  setFloatingItem(e, true)
}

const onMouseUp = (e: MouseEvent) => {
  if (!clicked) {
    return
  }
  const { pageX, pageY } = e

  // if has something overlapped
  const isItemSwapped = swapIfOverlappedWithItem()
  const isMovedToOhterColumn = moveToOtherColumn()

  if (isItemSwapped || isMovedToOhterColumn) {
    // update Query
  }

  resetToDefault()
}

const onMouseMove = (e: MouseEvent) => {
  if (!clicked) {
    return
  }

  setFloatingItem(e)

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

const swapIfOverlappedWithItem = () => {
  if (!overlappedElement.item) {
    return false
  }

  const parent = (overlappedElement.column ||
    target.parentElement) as HTMLElement
  parent.insertBefore(target, overlappedElement.item)
  //   if (overlappedPostion.top < targetPostion.top) {
  //     overlappedElement.item.insertAdjacentElement('beforebegin', target)
  //   } else {
  //     overlappedElement.item.insertAdjacentElement('afterend', target)
  //   }

  return true
}

const moveToOtherColumn = () => {
  if (overlappedElement.item || !overlappedElement.column) {
    return false
  }
  console.log('added to column')
  //   const container = document.querySelector('.column-items-container')
  //   console.log(container)
  overlappedElement.column.appendChild(target)
  return true
}

const findOverlappedItem = (e: MouseEvent) => {
  const { pageX, pageY } = e
  const elements = document.elementsFromPoint(e.pageX, e.pageY) as HTMLElement[]
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
    (item) => item.classList.contains('column-items-container') //&&item.id !== target.parentElement.id
  )

  overlappedElement.column = overlappedColumn
  if (!overlappedColumn) {
    return
  }
  overlappedElement.column.classList.add('overlapped')
}

const resetOverlapped = () => {
  if (overlappedElement.item) {
    overlappedElement.item.style = null
    overlappedElement.item.classList.remove('overlapped')
    overlappedElement.item = null
  }
  if (overlappedElement.column) {
    overlappedElement.column.style = null
    overlappedElement.column.classList.remove('overlapped')
    overlappedElement.column = null
  }
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
  isOnTop = null
  resetOverlapped()
}

window.addEventListener('pointerdown', onMouseDown)
window.addEventListener('pointerup', onMouseUp)
window.addEventListener('pointermove', onMouseMove)
