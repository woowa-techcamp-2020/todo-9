import { transform } from 'typescript'

const position = { x: 0, y: 0 }
let clicked: boolean = false
let target: HTMLElement = null
let cloned = null
let overlappedElement = { item: null, column: null }
let timeForPushed = 200
let debounceTimeout = 0
let moved = null

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
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  debounceTimeout = window.setTimeout(async () => {
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
  }, timeForPushed)
}

const onMouseUp = (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  if (!clicked || !isMovedEnough(e)) {
    return
  }

  // if has something overlapped
  const isItemSwapped = swapIfOverlappedWithItem()
  const isMovedToOhterColumn = moveToOtherColumn()

  if (isItemSwapped || isMovedToOhterColumn) {
    // update Query
  }

  resetToDefault()
}

const onMouseMove = (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }
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
  // 자기 자신의 칼럼에서 가장 밑으로 땡기는 거
  // if (
  //   !overlappedElement.column
  //   //  ||
  //   // overlappedElement.column === target.parentElement
  // ) {
  //   return false
  // }
  if (overlappedElement.item || !overlappedElement.column) {
    return false
  }

  overlappedElement.column.appendChild(target)
  return true
}

const isMovedEnough = (e: MouseEvent) => {
  console.log(position.x + e.pageX, position.y + e.pageY)
  console.log(e.pageX, e.pageY)
  const movedLength = Math.sqrt(
    (e.pageX - position.x) ** 2 + (e.pageY - position.y) ** 2
  )
  console.log(movedLength)
  return movedLength > 5
}

const findOverlappedItem = (e: MouseEvent) => {
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
  moved = null
  position.x = 0
  position.y = 0
  resetOverlapped()
}

window.addEventListener('pointerdown', onMouseDown)
window.addEventListener('pointerup', onMouseUp)
window.addEventListener('pointermove', onMouseMove)
