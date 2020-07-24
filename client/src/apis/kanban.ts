import { fetchWrapper } from '../utils/fetchWrapper'
import { IItem } from './item'
import { createLog } from './log'

export interface IKanban {
  kanbanId: number
  name: string
  userName: string
  items: IItem[]
}

export const getKanbans = async (userId: number): Promise<IKanban[]> => {
  try {
    const res = await fetchWrapper<IKanban[], undefined>(
      'GET',
      `/kanban/${userId}`
    )

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

export const deleteKanban = async (kanbanId: string, itemName: string) => {
  try {
    const res = await fetchWrapper<IKanban, undefined>(
      'DELETE',
      `/kanban/${kanbanId}`
    )

    await createLog({
      type: 'kanban',
      methodType: 'delete',
      itemName,
    })

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface ICreateKanbanBody {
  name: string
  userId: number
}

export const createKanban = async (body: ICreateKanbanBody) => {
  try {
    const res = await fetchWrapper<IKanban, ICreateKanbanBody>(
      'POST',
      '/kanban',
      body
    )

    await createLog({
      userId: body.userId,
      type: 'kanban',
      methodType: 'add',
      itemName: body.name,
    })

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface IKanbanBody {
  name: string
}

export const updateKanbanName = async (kanbanId: string, body: IKanbanBody) => {
  try {
    const res = await fetchWrapper<IKanban, IKanbanBody>(
      'PUT',
      `/kanban/${kanbanId}`,
      body
    )

    await createLog({
      type: 'kanban',
      methodType: 'update',
      itemName: body.name,
    })

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface IUpdateKanbanItemsBody {
  ids: string[]
}

export const updateKanbanItems = async ({
  kanbanId,
  ids,
  targetName,
  originName,
  itemName,
}) => {
  try {
    const res = await fetchWrapper<IKanban[], IUpdateKanbanItemsBody>(
      'PUT',
      `/kanban/${kanbanId}/items`,
      { ids }
    )

    await createLog({
      type: 'item',
      methodType: 'move',
      targetName,
      originName,
      itemName,
    })
  } catch (e) {
    console.error(e)

    return []
  }
}
