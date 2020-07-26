export const getUserId = (): number => {
  const container = document.querySelector('.todo-container')
  if (!container) {
    return null
  }
  return +container.id.split('-')[1].trim()
}
