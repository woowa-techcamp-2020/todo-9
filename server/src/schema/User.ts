import { getConnection } from '../config/db'
import { promiseHandler } from '../utils/promise-handler'
import {
  selectQueryExecuter,
  insertQueryExecuter,
} from '../utils/query-executor'

class User {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read() {
    const [users, errorFromGetUsers] = await selectQueryExecuter(
      `SELECT * FROM user;`
    )

    if (errorFromGetUsers) {
      throw errorFromGetUsers
    }

    return users
  }

  async create(name: string) {
    const [insertId, errorFromCreateUser] = await insertQueryExecuter(
      `INSERT into user(name) values('${name}')`
    )
    if (errorFromCreateUser) {
      throw errorFromCreateUser
    }

    return insertId
  }
}

export default new User()
