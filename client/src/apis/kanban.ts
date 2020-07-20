import { fetchWrapper } from '../utils/fetchWrapper'

export interface IKanban {
  id: string
  name: string
  userId: string
  ids: string[]
}

const getKanban = async (userId: string): Promise<IKanban[]> => {
  const res = await fetchWrapper<IKanban[], undefined>(
    'GET',
    `/kanban/${userId}`
  )

  return res
}
