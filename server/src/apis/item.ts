import { Router, Request, Response } from 'express'
import { item } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.post('/item', async (req: Request, res: Response) => {
  const { kanbanId, content } = req.body
  const [insertId, errorFromCreateItem] = await promiseHandler(
    item.create(kanbanId, content)
  )

  if (!insertId || errorFromCreateItem) {
    throw new Error("Cant't create item")
  }

  res.status(201).json()
})

export default app
