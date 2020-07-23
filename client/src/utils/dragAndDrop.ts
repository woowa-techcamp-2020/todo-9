import { updateKanbanItems } from '../apis/kanban'

const position = { x: 0, y: 0 }
let clicked: boolean = false
let target: HTMLElement = null
let cloned = null
let overlappedElement: { [key: string]: Element } = {
  item: null,
  column: null,
}
let timeForPushed = 200
let debounceTimeout = 0
let moved = null
let originColumn = null

const resetOverlapped = () => {
  for (const key in overlappedElement) {
    if (!overlappedElement[key]) {
      continue
    }
    overlappedElement[key].classList.remove('overlapped')
    overlappedElement[key] = null
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
  originColumn = null
  resetOverlapped()
}

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

  const parent = (overlappedElement.column ||
    target.parentElement) as HTMLElement
  parent.insertBefore(target, overlappedElement.item)
}

const findOverlappedColumn = (e: MouseEvent) => {
  const elements = document.elementsFromPoint(e.pageX, e.pageY)
  const [overlappedColumn, ..._] = elements.filter((item) =>
    item.classList.contains('column-items-container')
  )

  overlappedElement.column = overlappedColumn
  if (!overlappedColumn) {
    return
  }

  overlappedElement.column.appendChild(target)
}

const updateIfMoved = async () => {
  const currentColumn = target.closest('.column-items-container') as HTMLElement

  if (currentColumn !== originColumn) {
    await updateColumnIds(originColumn)
  }
  await updateColumnIds(currentColumn)
  await window.dispatchEvent(new Event('item_changed'))
}

const getId = (ele: HTMLElement | Element) => {
  return ele.id.split('-')[1]
}

const updateColumnIds = async (column: HTMLElement) => {
  const kanbanId = getId(column)
  const items = Array.from(column.querySelectorAll('.item-wrapper'))
  const ids = items.map((item) => getId(item))
  await updateKanbanItems({ kanbanId, ids })
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

    originColumn = target.closest('.column-items-container') as HTMLElement
    cloned = target.cloneNode(true)
    target.classList.add('temp')
    const { pageX, pageY } = e

    position.x = target.offsetLeft - pageX
    position.y = target.offsetTop - pageY

    setFloatingItem(e, true)
  }, timeForPushed)
}

const onMouseUp = async (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  if (!clicked) {
    return
  }

  await updateIfMoved()

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
  findOverlappedColumn(e)
  findOverlappedItem(e)
}

window.addEventListener('pointerdown', onMouseDown)
window.addEventListener('pointermove', onMouseMove)
window.addEventListener('pointerup', onMouseUp)

// const isMovedEnough = (e: MouseEvent) => {
//   const movedLength = Math.sqrt(
//     (e.pageX - position.x) ** 2 + (e.pageY - position.y) ** 2
//   )
//   console.log(movedLength)
//   return movedLength > 5
// }

// const swapIfOverlappedWithItem = () => {
//   if (!overlappedElement.item) {
//     return false
//   }

//   const parent = (overlappedElement.column ||
//     target.parentElement) as HTMLElement
//   parent.insertBefore(target, overlappedElement.item)
//   //   if (overlappedPostion.top < targetPostion.top) {
//   //     overlappedElement.item.insertAdjacentElement('beforebegin', target)
//   //   } else {
//   //     overlappedElement.item.insertAdjacentElement('afterend', target)
//   //   }

//   return true
// }

// const moveToOtherColumn = () => {
//   // 자기 자신의 칼럼에서 가장 밑으로 땡기는 거
//   // if (
//   //   !overlappedElement.column
//   //   //  ||
//   //   // overlappedElement.column === target.parentElement
//   // ) {
//   //   return false
//   // }
//   if (overlappedElement.item || !overlappedElement.column) {
//     return false
//   }

//   overlappedElement.column.appendChild(target)
//   return true
// }
