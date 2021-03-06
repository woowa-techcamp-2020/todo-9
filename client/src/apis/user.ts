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

    return []
  }
}

export interface ICreateUserBody {
  name: string
}

export interface IResponseCreateUser {
  insertId: number
}

export const createUser = async (
  body: ICreateUserBody
): Promise<IResponseCreateUser> => {
  try {
    const res = await fetchWrapper<IResponseCreateUser, ICreateUserBody>(
      'POST',
      '/user',
      body
    )
    return res
  } catch (e) {
    console.error(e)
  }
}
