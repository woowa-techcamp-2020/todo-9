import { Database } from './Database'
import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'

class User {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async create(name: string) {
    try {
      console.log(this.conn)
      const newUser = await this.conn.query(
        `INSERT INTO user(id, name) VALUES(${uuid()}, ${name});`
      )
      return newUser
    } catch (e) {
      console.error(e)
    }
    // return await this.conn.query(
    //   `INSERT INTO user(id, content, user_id, kanban_id) VALUES(${uuid()}, ${content}, ${user_id}, ${kanban_id})`
    // )
  }
}

export default new User()
