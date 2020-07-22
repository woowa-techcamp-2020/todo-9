import {
  selectQueryExecuter,
  insertQueryExecuter,
  updateQueryExecuter,
} from '../utils/query-executor'
import { IKanban, IItem } from './types'

class Kanban {
  async getAll(userId: string) {
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
            const getItemQuery = `SELECT id, content FROM item WHERE id=${itemIdx} and is_active=1`
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

  async getOne(kanbanId: number) {
    const [kanbans, errorFromGetKanban] = await selectQueryExecuter<IKanban>(
      `SELECT * FROM kanban WHERE is_active=1 and id=${kanbanId} limit 1`
    )

    if (errorFromGetKanban) {
      throw errorFromGetKanban
    }

    return kanbans[0]
  }

  async create(name: string, userId: string) {
    const [insertId, errorFromCreateKanban] = await insertQueryExecuter(
      `INSERT INTO kanban(name, ids, user_id) VALUES('${name}', '[]', ${userId})`
    )

    if (errorFromCreateKanban) {
      throw errorFromCreateKanban
    }
    return insertId
  }

  async updateName({ newName, userId, kanbanId }) {
    const [affectedRows, errorFromUpdateKanbanName] = await updateQueryExecuter(
      `UPDATE kanban SET name='${newName}' WHERE user_id=${userId} and id=${kanbanId}`
    )

    if (errorFromUpdateKanbanName) {
      throw errorFromUpdateKanbanName
    }

    return affectedRows
  }

  async updateItems({ userId, kanbanId, newIds }) {
    const [
      affectedRows,
      errorFromUpdateKanbanItems,
    ] = await updateQueryExecuter(
      `UPDATE kanban SET ids='[${newIds}]' WHERE user_id='${userId}' and id='${kanbanId}'`
    )

    if (errorFromUpdateKanbanItems) {
      throw errorFromUpdateKanbanItems
    }

    return affectedRows
  } // d a d

  async updateItemOne(kanbanId: number, newItemId: number) {
    const [affectedRows, errorFromUpdateKanbanItem] = await updateQueryExecuter(
      `UPDATE kanban SET ids=JSON_ARRAY_APPEND(ids, '$', ${newItemId}) WHERE id=${kanbanId}`
    )

    if (errorFromUpdateKanbanItem) {
      throw errorFromUpdateKanbanItem
    }

    return affectedRows
  } // item 생성

  async deleteKanban(kanbanId: string) {
    // is_active -> false
    const [affectedRows, errorFromDeleteKanban] = await updateQueryExecuter(
      `UPDATE kanban SET is_active=false WHERE id='${kanbanId}'`
    )

    if (errorFromDeleteKanban) {
      throw errorFromDeleteKanban
    }

    return affectedRows
  }
}

export default new Kanban()
