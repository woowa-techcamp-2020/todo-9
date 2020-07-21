import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'
import { promiseHandler } from '../utils/promiseHandler'
import { queryExecuter } from '../utils/queryExecuter'

class User {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read() {
    const getAllUserQuery = `SELECT * FROM user;`
    // const [[rows, _], getAllUserError] = await promiseHandler(
    //   this.conn.execute(getAllUserQuery)
    // )
    const [users, getAllUserError] = await queryExecuter(
      this.conn,
      getAllUserQuery
    )

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
