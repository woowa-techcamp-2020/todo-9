import { Router, Request, Response, NextFunction } from 'express'
import { item } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
import moment from 'moment'
import { pool } from '../config/db'
import { nextTick } from 'process'
const app = Router()

app.post('/item', async (req: Request, res: Response, next: NextFunction) => {
  const { kanbanId, content } = req.body
  const conn = await pool.getConnection()

  try {
    conn.beginTransaction()
    const [{ insertId }] = await conn.query(
      `INSERT INTO item(content, kanban_id) VALUES('${content}', ${kanbanId})`
    )
    if (insertId) {
      const [result, _] = await conn.query(
        `SELECT * FROM kanban WHERE is_active=1 and id=${kanbanId} limit 1`
      )
      await conn.query(
        `UPDATE kanban SET ids=JSON_ARRAY_APPEND(ids, '$', '${insertId}') WHERE id=${kanbanId}`
      )

      await conn.query(
        `INSERT INTO log(type, method_type, origin_name, user_id, item_name, created_at) VALUES('item', 'add', '${
          result[0].name
        }', ${result[0].user_id}, '${content}','${moment().format(
          'YYYY:MM:DD HH:mm:ss'
        )}' )`
      )
      await conn.commit()
      res.status(201).json('')
    }
  } catch (e) {
    conn.rollback()
    next(e)
  }
})

app.put(
  '/item/:itemId',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { itemId },
      body: { content: newContent },
    } = req
    const [_, error] = await promiseHandler(
      item.update(Number(itemId), newContent)
    )

    if (error) {
      next(error)
    }

    res.status(201).json('')
  }
)

app.delete(
  '/item/:itemId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemId } = req.params
    const [_, error] = await promiseHandler(item.delete(Number(itemId)))
    if (error) {
      next(error)
    }

    res.status(201).json('')
  }
)

export default app
