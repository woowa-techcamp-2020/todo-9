import { IUser } from './user'
import { fetchWrapper } from '../utils/fetchWrapper'

export interface IItem {
  id: string
  // kanbanId: string
  content: string
  // author: IUser
}
