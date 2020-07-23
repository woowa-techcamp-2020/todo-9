import { IUser } from './user'
import { fetchWrapper } from '../utils/fetchWrapper'
import { promiseHandler } from '../utils/promiseHandler'

export interface IItem {
  id: number
  content: string
}

export interface ICreateItemBody {
  kanbanId: number
  content: string
}

export const createItem = async (body: ICreateItemBody): Promise<void> => {
  const [_, error] = await promiseHandler(
    fetchWrapper<IUser[], ICreateItemBody>('POST', `/item`, body)
  )
  if (error) {
    console.error(error)
  }
}

export const updateItem = async (item: IItem): Promise<void> => {
  const [_, error] = await promiseHandler(
    fetchWrapper<IUser[], Partial<IItem>>('PUT', `/item/${item.id}`, {
      content: item.content,
    })
  )
  console.log(error)
  if (error) {
    console.error(error)
  }
}

export const deleteItem = async (id: number): Promise<void> => {
  const [_, error] = await promiseHandler(
    fetchWrapper<IUser[], Partial<IItem>>('DELETE', `/item/${id}`)
  )

  if (error) {
    console.error(error)
  }
}
