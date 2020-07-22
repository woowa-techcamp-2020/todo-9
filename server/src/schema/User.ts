import { getConnection } from '../config/db'
import { promiseHandler } from '../utils/promise-handler'
import { selectQueryExecuter } from '../utils/query-executor'

class User {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read() {
    const getAllUserQuery = `SELECT * FROM user;`
    const [users, getAllUserError] = await selectQueryExecuter(getAllUserQuery)

    if (getAllUserError) {
      throw getAllUserError
    }

    return users
  }

  async create(name: string) {
    const createNewUserQuery = `INSERT INTO user(name) VALUES('${name}');`
    const [{ insertId }, createNewUserError] = await promiseHandler(
      this.conn.execute(createNewUserQuery)
    )

    if (createNewUserError) {
      throw createNewUserError
    }

    return insertId
  }
}

export default new User()
