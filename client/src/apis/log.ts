import { IItem } from './item'
import { IUser } from './user'
import { IKanban } from './kanban'
import { fetchWrapper } from '../utils/fetchWrapper'

export type MethodTpyeOfItemLog = 'add' | 'delete' | 'update' | 'move'

export interface ICreateLogBody {
  userId: number
  type: 'item' | 'kanban'
  methodType: MethodTpyeOfItemLog
  originName?: string
  targetName?: string
  itemName?: string
}

export interface ILog {
  id: number
  type: 'item' | 'kanban'
  created_at: string
  item_name: string
  method_type: MethodTpyeOfItemLog
  origin_name: string
  target_name: string
}

export const getLogs = async (userId: number): Promise<ILog[]> => {
  try {
    const res = await fetchWrapper<ILog[], undefined>('GET', `/logs/${userId}`)
    return res
  } catch (e) {
    console.error(e)
  }
}

export const createLog = async (body: ICreateLogBody) => {
  try {
    return await fetchWrapper<undefined, ICreateLogBody>('POST', '/log', body)
  } catch (e) {
    console.error(e)
  }
}
