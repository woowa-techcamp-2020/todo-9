import { Router, Request, Response, NextFunction } from 'express'
import { kanban } from '../schema'
import { promiseHandler } from '../utils/promiseHandler'
const app = Router()

app.get('/kanban/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params
  if (!userId) {
    throw new Error('request body is wrong')
  }
  const [kanbans, errorFromGetKanban] = await promiseHandler(
    kanban.read(userId)
  )
  if (errorFromGetKanban) {
    throw errorFromGetKanban
  }

  res.status(200).json(kanbans)
})

app.post('/kanban', async (req: Request, res: Response, next: NextFunction) => {
  const { name, userId } = req.body
  if (!name || !userId) {
    throw new Error('request body is wrong')
  }

  const [insertId, errorFromPostKanban] = await promiseHandler(
    kanban.create(name, userId)
  )
  if (errorFromPostKanban || !insertId) {
    throw errorFromPostKanban
  }

  res.status(201).json({ insertId })
})

export default app

app.put(
  '/kanban/:kanbanId',
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      params: { kanbanId },
      body: { userId, name: newName },
    } = req
    if (!kanbanId || !userId || !newName) {
      throw new Error('request body is wrong')
    }
    const [affectedRows, errorFromUpdateKanbanName] = await promiseHandler(
      kanban.updateName({ newName, kanbanId, userId })
    )

    if (errorFromUpdateKanbanName) {
      throw errorFromUpdateKanbanName
    }

    res.status(200).json({ affectedRows })
  }
)
