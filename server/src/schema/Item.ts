import {
  insertQueryExecuter,
  updateQueryExecuter,
} from '../utils/query-executor'

class Item {
  // kanbanId, content
  async create(kanbanId, content) {
    const [insertId, errorFromCreateItem] = await insertQueryExecuter(
      `INSERT INTO item(content, kanban_id) VALUES('${content}', '${kanbanId}')`
    )
    if (errorFromCreateItem) {
      throw errorFromCreateItem
    }

    return insertId
  }

  async update(itemId, newContent) {
    const [affectedRows, errorFromUpdateItem] = await updateQueryExecuter(
      `UPDATE item SET content=${newContent} WHERE id=${itemId}`
    )
    if (errorFromUpdateItem) {
      throw errorFromUpdateItem
    }

    return affectedRows
  }
}

export default new Item()
