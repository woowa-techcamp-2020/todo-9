import { promiseHandler } from './promiseHandler'
import { getConnection } from '../config/db'

export type MysqlInsertOrUpdateResult = {
  fieldCount: number
  affectedRows: number
  insertId: number
  serverStatus: number
  warningCount: number
  message: string
  protocol41: boolean
  changedRows: number
}

export const selectQueryExecuter = async <T>(
  query: string
): Promise<[T[], any]> => {
  const conn = getConnection()

  const [[result, _], error] = await promiseHandler(conn.execute(query))
  // console.log(result)
  return [result as T[], error]
}

export const inserQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const conn = getConnection()

  const [{ insertId }, error] = await promiseHandler(conn.execute(query))
  return [insertId, error]
}

export const updateQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const conn = getConnection()

  const [{ affectedRows }, error] = await promiseHandler(conn.execute(query))
  return [affectedRows, error]
}
