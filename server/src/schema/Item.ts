import {
  insertQueryExecuter,
  updateQueryExecuter,
} from '../utils/query-executor'

class Item {
  // kanbanId, content
  async create(kanbanId: number, content: string) {
    const [insertId, error] = await insertQueryExecuter(
      `INSERT INTO item(content, kanban_id) VALUES('${content}', ${kanbanId})`
    )
    if (error) {
      throw error
    }
    return insertId
  }

  async update(itemId: number, newContent: string) {
    const [affectedRows, error] = await updateQueryExecuter(
      `UPDATE item SET content="${newContent}" WHERE id=${itemId}`
    )
    if (error) {
      throw error
    }

    return affectedRows
  }

  async delete(itemId: number) {
    const [affectedRows, error] = await updateQueryExecuter(
      `UPDATE item SET is_active=false WHERE id=${itemId}`
    )
    if (error) {
      throw error
    }

    return affectedRows
  }
}

export default new Item()
