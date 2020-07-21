import { fetchWrapper } from '../utils/fetchWrapper'
import { IItem } from './item'
export interface IKanban {
  id: string
  name: string
  userName: string
  items: IItem[]
}

const getKanban = async (userId: string): Promise<IKanban[]> => {
  const res = await fetchWrapper<IKanban[], undefined>(
    'GET',
    `/kanban/${userId}`
  )

  return res
}
