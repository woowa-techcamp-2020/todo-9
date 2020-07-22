import { promiseHandler } from './promiseHandler'
import { getConnection } from 'src/config/db'

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
  const { execute } = getConnection()

  const [[result, _], error] = await promiseHandler(execute(query))
  return [result as T[], error]
}

export const inserQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const { execute } = getConnection()

  const [{ insertId }, error] = await promiseHandler(execute(query))
  return [insertId, error]
}

export const updateQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const { execute } = getConnection()

  const [{ affectedRows }, error] = await promiseHandler(execute(query))
  return [affectedRows, error]
}
