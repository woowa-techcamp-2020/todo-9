import { deleteItem } from '../apis/item'
import { updateKanbanItems } from '../apis/kanban'

const position = { x: 0, y: 0 }
let clicked: boolean = false
let target: HTMLElement = null
let cloned = null
let overlappedElement: { [key: string]: Element } = {
  item: null,
  column: null,
}
let timeForPushed = 300
let debounceTimeout = 0
let moved = null
let originColumn = null
let trashCan

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

  // const trashCan = document.querySelector('.trash-can')
  if (trashCan) {
    trashCan.classList.remove('activated')
    trashCan.classList.remove('overlapped')
  }

  target = null
  cloned = null
  moved = null
  position.x = 0
  position.y = 0
  originColumn = null
  trashCan = null
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

const findOverlappedOnTrashCan = (e: MouseEvent) => {
  const elements = document.elementsFromPoint(e.pageX, e.pageY) as HTMLElement[]
  const [overlappedTrashCan, ..._] = elements.filter((item) =>
    item.classList.contains('trash-can')
  )
  if (!overlappedTrashCan) {
    return
  }
  overlappedTrashCan.classList.add('overlapped')
  // setTimeout(() => {
  //   console.log('removed')
  // }, 500)
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

  // update column counter
  // const columnCounter = (column.closest(
  //   '.column-wrapper'
  // ) as HTMLElement).querySelector('.todo-count') as HTMLDivElement
  // columnCounter.innerText = ids.length.toString()
}

const onMouseItemDown = (e: MouseEvent) => {
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
    trashCan = document.querySelector('.trash-can')
    trashCan.classList.add('activated')

    window.addEventListener('pointermove', onMouseItemMove)
    window.addEventListener('pointerup', onMouseItemUp)
  }, timeForPushed)
}

const onMouseItemUp = async (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  if (!clicked) {
    return
  }

  if (trashCan && trashCan.classList.contains('overlapped')) {
    await deleteItem(+getId(target))
    target.remove()
    await window.dispatchEvent(new Event('item_changed'))
  } else {
    await updateIfMoved()
  }

  resetToDefault()
  window.removeEventListener('pointerup', onMouseItemUp)
  window.removeEventListener('pointermove', onMouseItemMove)
}

const onMouseItemMove = (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }
  if (!clicked) {
    return
  }

  setFloatingItem(e)
  // findOverlappedOnTrashCan(e)

  resetOverlapped()
  findOverlappedColumn(e)
  findOverlappedItem(e)
}

window.addEventListener('pointerdown', onMouseItemDown)
