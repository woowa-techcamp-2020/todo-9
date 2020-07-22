import { promiseHandler } from './promiseHandler'

export const queryExecuter = async (conn: any, query: string) => {
  const [[result, _], error] = await promiseHandler(conn.execute(query))
  return [result, error]
}
