import { IItem } from './item'
import { IUser } from './user'
import { IKanban } from './kanban'

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
