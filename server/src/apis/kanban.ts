import { Router, Request, Response, NextFunction } from 'express'
import { kanban } from '../schema'
import { Console } from 'console'
import { promiseHandler } from '../utils/promiseHandler'
const app = Router()

app.get('/kanban/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params

  const [kanbans, getKanbanError] = await promiseHandler(kanban.read(userId))
  if (getKanbanError) {
    console.error(getKanbanError)
    throw getKanbanError
  }

  res.status(200).json(kanbans)
})

// app.post('/user', async (req: Request, res: Response, next: NextFunction) => {
//   const { name } = req.body
//   const insertId = await user.create(name)
//   if (!insertId) {
//     next(new Error("Can't create user"))
//   }
//   res.status(201).json()
// })

export default app
