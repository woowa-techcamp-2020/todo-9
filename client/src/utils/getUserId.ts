export const getUserId = (): number => {
  const container = document.querySelector('.todo-container')
  return +container.id.split('-')[1].trim()
}
