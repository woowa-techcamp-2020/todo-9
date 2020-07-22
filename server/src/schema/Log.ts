import {
  selectQueryExecuter,
  insertQueryExecuter,
} from '../utils/query-executor'
import moment from 'moment'

export type MethodTypeOfLog = 'add' | 'delete' | 'update' | 'move'
export type TypeOfLog = 'item' | 'kanban'
// id	int
// type enum('item', 'kanban')
// method-type	enum('add', 'delete', 'update', 'move')
// user_id	VARCHAR(10)
// origin_name	VARCHAR(20)
// target_name	VARCHAR(20)
// created_at	datetime

// 아이템 생성, 삭제, 이동, 수정
// 칸반 이동, 생성, 삭제

interface ICreateLog {
  type: TypeOfLog
  methodType: MethodTypeOfLog
  userId: number
  originName?: string
  targetName?: string
}

class Log {
  async create(args: ICreateLog) {
    const { type, methodType, userId, originName, targetName } = args
    const [insertId, errorFromCreateLog] = await insertQueryExecuter(
      `INSERT INTO log(type, method_type, origin_name, target_name, user_id, created_at) VALUES('${type}', '${methodType}', '${originName}', '${targetName}', '${userId}', '${moment().format(
        'YYYY:MM:DD HH:mm:ss'
      )}' )`
    )

    if (errorFromCreateLog) {
      throw errorFromCreateLog
    }

    return insertId
  }
}

export default new Log()
