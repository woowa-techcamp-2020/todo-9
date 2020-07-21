import { fetchWrapper } from '../utils/fetchWrapper'
import { IItem } from './item'
import { IUser } from './user'

export interface IKanban {
  id: string
  name: string
  userName: string
  items: IItem[]
}

export const getKanbans = async (userId: string): Promise<IKanban[]> => {
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

export const deleteKanbans = async (kanbanId: string) => {
  try {
    const res = await fetchWrapper<IKanban, undefined>(
      'DELETE',
      `/kanban/${kanbanId}`
    )

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface IKanbanBody {
  name: string
}

export const createKanban = async (body: IKanbanBody) => {
  try {
    const res = await fetchWrapper<IKanban, IKanbanBody>(
      'POST',
      '/kanban',
      body
    )

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

export const updateKanbanName = async (kanbanId: string, body: IKanbanBody) => {
  try {
    const res = await fetchWrapper<IKanban, IKanbanBody>(
      'PUT',
      `/kanban/${kanbanId}`,
      body
    )

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface IUpdateKanbanItemsBody {
  userId: string
  ids: string[]
}

export const updateKanbanItems = async ({ userId, kanbanId, ids }) => {
  try {
    const res = await fetchWrapper<IKanban[], IUpdateKanbanItemsBody>(
      'PUT',
      `/kanban/${kanbanId}/items`,
      { userId, ids }
    )
  } catch (e) {
    console.error(e)

    return []
  }
}
