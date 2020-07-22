import { Database } from './Database'

export type TpyeOfItemLog = 'add' | 'delete' | 'update' | 'move'
// id	VARCHAR(10)
// type	enum('add', 'delete', 'update', 'move')
// author	VARCHAR(10)
// content	VARCHAR(255)
// origin_name	VARCHAR(20)
// target_name	VARCHAR(20)
// createdAt	datetime
class Log {
  private conn

  constructor() {
    this.conn = Database.connectedDB
  }

  create(type: TpyeOfItemLog, userId: string) {}
}

export default new Log()
