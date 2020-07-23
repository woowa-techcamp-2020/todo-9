import { fetchWrapper } from '../utils/fetchWrapper'
import { IItem } from './item'

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

export const deleteKanban = async (kanbanId: string) => {
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

interface ICreateKanbanBody {
  name: string
  userId: number
}

export const createKanban = async (body: ICreateKanbanBody) => {
  console.log('call!!!')
  try {
    const res = await fetchWrapper<IKanban, ICreateKanbanBody>(
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

    return res
  } catch (e) {
    console.error(e)

    return []
  }
}

interface IUpdateKanbanItemsBody {
  ids: string[]
}

export const updateKanbanItems = async ({ kanbanId, ids }) => {
  try {
    const res = await fetchWrapper<IKanban[], IUpdateKanbanItemsBody>(
      'PUT',
      `/kanban/${kanbanId}/items`,
      { ids }
    )
  } catch (e) {
    console.error(e)

    return []
  }
}
