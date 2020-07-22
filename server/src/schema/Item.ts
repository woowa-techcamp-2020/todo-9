import { Database } from './Database'
import { getConnection } from '../config/db'
// Name	Type
// id	int
// content	VARCHAR(255)
// user_id	int
// kanban_id	Int

class Item {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read() {
    return await this.conn.execute('SELECT * FROM item;')
  }

  async create(content: string, user_id: string, kanban_id: string) {
    try {
      const newItem = await this.conn.execute(
        `INSERT INTO item(content, user_id, kanban_id) VALUES('${content}', '${user_id}', '${kanban_id}');`,
        [content, user_id, kanban_id]
      )
      return newItem
    } catch (e) {
      console.error(e)
    }
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
