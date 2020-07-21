import { uuid } from 'uuidv4'
import { getConnection } from '../config/db'

class Kanban {
  private conn

  constructor() {
    this.conn = getConnection()
  }

  async read(userId: string) {
    try {
      const [rows] = await this.conn.execute(
        `SELECT k.id, k.name, k.ids, u.name as userName FROM kanban k JOIN user u on u.id = k.user_id WHERE k.user_id = ${userId};`
      )

      const response = []

      await Promise.all(
        rows.map(async (row) => {
          const { id, name, userName, ids } = row
          const items = []

          await Promise.all(
            ids.map(async (id) => {
              const [item] = await this.conn.execute(
                `SELECT id, content FROM item WHERE id=${id}`
              )
              items.push(item[0])
            })
          )

          response.push({ kanbanId: id, items, name, userName })
          console.log('response', response)
        })
      )

      // 방법2
      // 장점: 느림 , 하지만 순서가 보장
      for (const row of rows) {
        const { id, name, userName, ids } = row
        const items = []

        for (const id of ids) {
          const [item] = await this.conn.execute(
            `SELECT id, content FROM item WHERE id=${id}`
          )
          items.push(item[0])
        }

        response.push({ kanbanId: id, items, name, userName })
      }

      console.log(JSON.stringify(response, null, 2))
      return response
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

export default new Kanban()
