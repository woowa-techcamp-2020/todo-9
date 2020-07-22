import { promiseHandler } from './promise-handler'
import { pool } from '../config/db'

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
  const [[result, _], error] = await promiseHandler(pool.query(query))
  return [result as T[], error]
}

export const insertQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const [[{ insertId }, _], error] = await promiseHandler(pool.execute(query))
  return [insertId, error]
}

export const updateQueryExecuter = async (
  query: string
): Promise<[number, any]> => {
  const [[{ affectedRows }, _], error] = await promiseHandler(
    pool.execute(query)
  )
  return [affectedRows, error]
}

export const transactionQueryExecuter = async (...queries: Promise<any>[]) => {
  // const conn = await pool.getConnection()
  // try {
  //   conn.beginTransaction()
  //   for (const query of queries) {
  //     await promiseHandler(query)
  //   }
  //   conn.commit()
  //   return true
  // } catch (e) {
  //   conn.release()
  //   return false
  // }
}
