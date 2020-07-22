import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'
import { promiseHandler } from '../utils/promiseHandler'
import { selectQueryExecuter } from '../utils/queryExecuter'
import { IKanban, IItem } from './types'

class Kanban {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read(userId: string) {
    const getKanbanQuery = `SELECT k.id, k.name, k.ids as itemIndexes, u.name as userName FROM kanban k JOIN user u on u.id = k.user_id WHERE k.user_id = ${userId} and k.is_active = 1;`
    const [kanbans, getKanbanError] = await selectQueryExecuter<IKanban>(
      getKanbanQuery
    )

    if (getKanbanError) {
      throw getKanbanError
    }

    const getKanbanResponse = new Array(kanbans.length).fill(null)

    await Promise.all(
      kanbans.map(async (kanban, kanbanIdx) => {
        const { id, name, userName, itemIndexes } = kanban
        const items = new Array(itemIndexes.length).fill(null) as IItem[]

        await Promise.all(
          itemIndexes.map(async (itemIdx, indexOfId) => {
            const getItemQuery = `SELECT id, content FROM item WHERE id=${itemIdx}`
            const [[item, _], getItemError] = await selectQueryExecuter<IItem>(
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
