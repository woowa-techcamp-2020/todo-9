import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'
import { promiseHandler } from '../utils/promiseHandler'
import { queryExecuter } from '../utils/queryExecuter'

class Kanban {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read(userId: string) {
    const getKanbanQuery = `SELECT k.id, k.name, k.ids, u.name as userName FROM kanban k JOIN user u on u.id = k.user_id WHERE k.user_id = ${userId};`
    const [[kanbans, _], getKanbanError] = await promiseHandler(
      this.conn.execute(getKanbanQuery)
    )

    if (getKanbanError) {
      throw getKanbanError
    }

    const getKanbanResponse = new Array(kanbans.length).fill(null)

    await Promise.all(
      kanbans.map(async (kanban, kanbanIdx) => {
        const { id, name, userName, ids: itemIndxes } = kanban
        const items = new Array(itemIndxes.length).fill(null)

        await Promise.all(
          itemIndxes.map(async (itemIdx, indexOfId) => {
            const getItemQuery = `SELECT id, content FROM item WHERE id=${itemIdx}`
            const [[item, _], getItemError] = await queryExecuter(
              this.conn,
              getItemQuery
            )

            if (getItemError) {
              throw getItemError
            }

            items[indexOfId] = item
          })
        )

        getKanbanResponse[kanbanIdx] = { kanbanId: id, items, name, userName }
      })
    )

    return getKanbanResponse
  }

  async create(name: string, userId: number) {
    const [result, error] = await promiseHandler(
      this.conn.execute(
        `INSERT INTO kanban(name, ids, user_id) VALUES('${name}', '[]', '${userId}')`
      )
    )
    if (error) {
      throw new Error(error)
    }
    return result[0].insertId
  }
}

export default new Kanban()
