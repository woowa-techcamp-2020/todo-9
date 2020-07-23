import { Router, Request, Response, NextFunction } from 'express'
import { kanban } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.get(
  '/kanban/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    if (!userId) {
      throw new Error('request is wrong')
    }
    const [kanbans, error] = await promiseHandler(kanban.getAll(userId))
    if (error) {
      next(error)
    }

    res.status(200).json(kanbans)
  }
)

app.post('/kanban', async (req: Request, res: Response, next: NextFunction) => {
  const { name, userId } = req.body
  if (!name || !userId) {
    throw new Error('request is wrong')
  }

  const [_, error] = await promiseHandler(kanban.create(name, userId))
  if (error) {
    next(error)
  }

  // kanban 생성을 로그에 넣어줘야함

  res.status(201).json('')
})

app.put('/kanban/:kanbanId', async (req: Request, res: Response) => {
  const {
    params: { kanbanId },
    body: { name: newName },
  } = req
  if (!kanbanId || !newName) {
    throw new Error('request is wrong')
  }
  const [affectedRows, errorFromUpdateKanbanName] = await promiseHandler(
    kanban.updateName({ newName, kanbanId })
  )

  if (errorFromUpdateKanbanName) {
    throw errorFromUpdateKanbanName
  }

  res.status(200).json('')
})

app.put('/kanban/:kanbanId/items', async (req: Request, res: Response) => {
  const {
    params: { kanbanId },
    body: { ids: newIds },
  } = req
  if (!kanbanId) {
    throw new Error('request is wrong')
  }

  const [affectedRows, errorFromUpdateKanbanName] = await promiseHandler(
    kanban.updateItems({ newIds, kanbanId })
  )

  if (errorFromUpdateKanbanName) {
    throw errorFromUpdateKanbanName
  }

  res.status(200).json('')
})

app.delete('/kanban/:kanbanId', async (req: Request, res: Response) => {
  const { kanbanId } = req.params
  if (!kanbanId) {
    throw new Error('request is wrong')
  }

  const [affectedRows, errorFromDeleteKanban] = await promiseHandler(
    kanban.deleteKanban(kanbanId)
  )

  if (errorFromDeleteKanban) {
    throw errorFromDeleteKanban
  }

  res.status(200).json('')
})

export default app
