import { IItem } from './item'
import { IUser } from './user'
import { IKanban } from './kanban'
import { fetchWrapper } from '../utils/fetchWrapper'

export type TpyeOfItemLog = 'add' | 'delete' | 'update' | 'move'

export interface ILog {
  id: string
  type: TpyeOfItemLog
  author: IUser
  item: IItem
  originKanban: IKanban
  targetKanban: IKanban
  createdAt: Date
}

export const getLogs = (page: number): Promise<ILog[]> => {
  try {
    const res = fetchWrapper<ILog[], undefined>('GET', '/logs')
    return res
  } catch (e) {
    console.error(e)
  }
}

// export const createLog = (type: TpyeOfItemLog, )
