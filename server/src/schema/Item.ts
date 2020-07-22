// Name	Type
import { insertQueryExecuter } from '../utils/query-executor'

class Item {
  // kanbanId, content
  async create(kanbanId, content) {
    const [insertId, errorFromCreateKanban] = await insertQueryExecuter(
      `INSERT INTO item(content, kanban_id) VALUES('${content}', '${kanbanId}')`
    )
    if (errorFromCreateKanban) {
      throw errorFromCreateKanban
    }

    return insertId
  }
}

export default new Item()
