import { IUser } from './user'

export interface IItem {
  id: string
  kanbanId: string
  content: string
  author: IUser
}
