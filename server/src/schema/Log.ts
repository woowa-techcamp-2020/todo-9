import {
  selectQueryExecuter,
  insertQueryExecuter,
} from '../utils/query-executor'
import { ILog } from './types'
import moment from 'moment'

// id	int
// type enum('item', 'kanban')
// method-type	enum('add', 'delete', 'update', 'move')
// user_id	VARCHAR(10)
// origin_name	VARCHAR(20)
// target_name	VARCHAR(20)
// created_at	datetime

// 아이템 생성, 삭제, 이동, 수정
// 칸반 이동, 생성, 삭제

export type MethodTypeOfLog = 'add' | 'delete' | 'update' | 'move'
export type TypeOfLog = 'item' | 'kanban'

interface ICreateLog {
  type: TypeOfLog
  methodType: MethodTypeOfLog
  userId: number
  itemName: string
  originName?: string
  targetName?: string
}

class Log {
  async create(args: ICreateLog) {
    console.log('args', args)
    const { type, methodType, originName, targetName, itemName, userId } = args
    const [insertId, error] = await insertQueryExecuter(
      `INSERT INTO log(type, method_type, origin_name, target_name, item_name, user_id, created_at) VALUES('${type}', '${methodType}', '${originName}', '${targetName}', '${itemName}', ${userId},'${moment().format(
        'YYYY:MM:DD HH:mm:ss'
      )}' )`
    )

    if (error) {
      throw error
    }

    return insertId
  }

  async getAll(userId) {
    const [logs, errorFromGetLog] = await selectQueryExecuter<ILog>(
      `SELECT * FROM log WHERE user_id=${userId}`
    )

    if (errorFromGetLog) {
      throw errorFromGetLog
    }

    return logs
  }
}

export default new Log()
