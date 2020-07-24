import { deleteItem } from '../apis/item'
import { updateKanbanItems, deleteKanban } from '../apis/kanban'

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
  resetOverlapped()
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

const setFloatingColumn = (e: MouseEvent, init: boolean = false) => {
  const { pageX, pageY } = e

  const floatingItem = document.querySelector('.float-column') as HTMLElement

  floatingItem.style.left = pageX + position.x + 'px'
  floatingItem.style.top = pageY + position.y + 'px'

  if (init) {
    floatingItem.appendChild(cloned)
  }
  return floatingItem
}

const onMouseColumnDown = (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  debounceTimeout = window.setTimeout(async () => {
    target = (e.target as HTMLElement).closest('.column-wrapper')
    if (!target) {
      return
    }

    clicked = true

    cloned = target.cloneNode(true)
    target.classList.add('temp')
    const { pageX, pageY } = e

    position.x = target.offsetLeft - pageX
    position.y = target.offsetTop - pageY

    setFloatingColumn(e, true)
    trashCan = document.querySelector('.trash-can')
    trashCan.classList.add('activated')

    window.addEventListener('pointermove', onMouseColumnMove)
    window.addEventListener('pointerup', onMouseColumnUp)
  }, timeForPushed)
}

const onMouseColumnUp = async (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }

  if (!clicked) {
    return
  }

  // if (trashCan && trashCan.classList.contains('overlapped')) {
  //   const itemContainer = target.closest('.column-items-container')
  //   await deleteKanban(getId(itemContainer))
  //   target.remove()
  // } else {
  //   await updateIfMoved()
  // }

  if (overlappedElement.column) {
    overlappedElement.column.parentElement.insertBefore(
      target,
      overlappedElement.column
    )
  }

  resetToDefault()
  window.removeEventListener('pointerup', onMouseColumnUp)
  window.removeEventListener('pointermove', onMouseColumnMove)
}

const findOverlappedColumnForColumn = (e: MouseEvent) => {
  const elements = document.elementsFromPoint(e.pageX, e.pageY)
  const [overlappedColumn, ..._] = elements.filter(
    (item) => item.classList.contains('column-wrapper') && item !== target
  )

  console.log('overlapped', overlappedColumn)
  overlappedElement.column = overlappedColumn
  if (!overlappedColumn) {
    return
  }
  //   console.log(target)
  overlappedColumn.appendChild(target)
}

const onMouseColumnMove = (e: MouseEvent) => {
  if (debounceTimeout) {
    window.clearTimeout(debounceTimeout)
  }
  if (!clicked) {
    return
  }

  setFloatingColumn(e)
  findOverlappedOnTrashCan(e)

  resetOverlapped()
  findOverlappedColumnForColumn(e)
  // findOverlappedItem(e)
}

window.addEventListener('pointerdown', onMouseColumnDown)
