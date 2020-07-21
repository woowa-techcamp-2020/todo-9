import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'

class User {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read() {
    try {
      const [rows] = await this.conn.execute(`SELECT * FROM user;`)
      return rows
    } catch (e) {
      console.error(e)

      return []
    }
  }

  async create(name: string) {
    try {
      const { insertId } = await this.conn.execute(
        `INSERT INTO user(name) VALUES('${name}');`
      )
      return insertId
    } catch (e) {
      console.error(e)
    }
  }
}

export default new User()
