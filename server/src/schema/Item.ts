import { Database } from './Database'
import { uuid } from 'uuidv4'
// Name	Type
// id	int
// content	VARCHAR(255)
// user_id	int
// kanban_id	Int

class Item {
  private conn

  constructor() {
    this.conn = Database.connectedDB
  }

  async read() {
    return await this.conn.execute('SELECT * FROM item;')
  }
  async create(content: string, user_id: string, kanban_id: string) {
    try {
      const newItem = await this.conn.execute(
        `INSERT INTO item(id, content, user_id, kanban_id) VALUES(${uuid()}, ${content}, ${user_id}, ${kanban_id});`,
        [uuid(), content, user_id, kanban_id]
      )
      return newItem
    } catch (e) {
      console.error(e)
    }
    // return await this.conn.query(
    //   `INSERT INTO user(id, content, user_id, kanban_id) VALUES(${uuid()}, ${content}, ${user_id}, ${kanban_id})`
    // )
  }

  async update(id: string, content: string) {
    return await this.conn.execute(
      `UPDATE item SET content='${content}' WHERE id='${id}' LIMIT 10;`
    )
  }

  async delete(id: string) {
    return await this.conn.execute(`DELETE FROM item WHERE id='${id}';`)
  }
}

export default new Item()
