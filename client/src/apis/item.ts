import { IUser } from './user'
import { createLog } from './log'
import { fetchWrapper } from '../utils/fetchWrapper'
import { promiseHandler } from '../utils/promiseHandler'
import { getUserId } from '../utils/getUserId'

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
  const [_, errorFromUpdate] = await promiseHandler(
    fetchWrapper<undefined, Partial<IItem>>('PUT', `/item/${item.id}`, {
      content: item.content,
    })
  )
  if (errorFromUpdate) {
    console.error(errorFromUpdate)
  }

  const [__, errorFromCreate] = await promiseHandler(
    createLog({
      userId: getUserId(),
      type: 'item',
      methodType: 'update',
      itemName: item.content,
    })
  )

  if (errorFromCreate) {
    console.error(errorFromCreate)
  }
}

export const deleteItem = async (
  id: number,
  itemName: string
): Promise<void> => {
  const [_, errorFromDelete] = await promiseHandler(
    fetchWrapper<IUser[], Partial<IItem>>('DELETE', `/item/${id}`)
  )

  if (errorFromDelete) {
    console.error(errorFromDelete)
  }

  const [__, errorFromCreate] = await promiseHandler(
    createLog({
      userId: getUserId(),
      type: 'item',
      methodType: 'delete',
      itemName,
    })
  )

  if (errorFromCreate) {
    console.error(errorFromCreate)
  }
}
