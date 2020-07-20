import { fetchWrapper } from '../utils/fetchWrapper'

export interface IUser {
  id: string
  name: string
}

export interface IgetUsersResponse {}

export const getUsers = async (): Promise<IUser[]> => {
  try {
    const res = await fetchWrapper<IUser[], undefined>('GET', '/users')
    return res
  } catch (e) {
    console.error(e)
  }
}

export interface ICreateUserBody {
  name: string
}

export const createUser = async (body: ICreateUserBody): Promise<IUser> => {
  try {
    const res = await fetchWrapper<IUser, ICreateUserBody>(
      'POST',
      '/user',
      body
    )
    return res
  } catch (e) {
    console.error(e)
  }
}
