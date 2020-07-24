import { IItem } from './item'
import { IUser } from './user'
import { IKanban } from './kanban'
import { fetchWrapper } from '../utils/fetchWrapper'

export type MethodTpyeOfItemLog = 'add' | 'delete' | 'update' | 'move'
export interface ICreateLogBody {
  type: 'item' | 'kanban'
  methodType: MethodTpyeOfItemLog
  originName?: string
  targetName?: string
  itemName?: string
}

export interface ILog extends ICreateLogBody {
  id: number
}

export const getLogs = async (page: number): Promise<ILog[]> => {
  try {
    const res = await fetchWrapper<ILog[], undefined>('GET', '/logs')
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
