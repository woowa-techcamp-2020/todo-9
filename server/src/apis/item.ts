import { Router, Request, Response } from 'express'
import { item, kanban } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
import {
  transactionQueryExecuter,
  updateQueryExecuter,
} from '../utils/query-executor'
const app = Router()

app.post('/item', async (req: Request, res: Response) => {
  const { userId, kanbanId, content } = req.body

  const [insertId, errorFromCreateItem] = await promiseHandler(
    item.create(kanbanId, content)
  )

  if (errorFromCreateItem) {
    throw errorFromCreateItem
  }

  // kaban update
  // log update
  const success = await transactionQueryExecuter(
    kanban.updateItemOne(kanbanId, insertId)
  )

  res.status(201).json()
})

app.put('/item/:itemId', async (req: Request, res: Response) => {
  const {
    params: { itemId },
    body: { content: newContent },
  } = req
  const [affectedRows, errorFromUpdateItem] = await promiseHandler(
    item.update(itemId, newContent)
  )

  if (errorFromUpdateItem) {
    throw errorFromUpdateItem
  }

  res.status(201).json()
})

export default app
