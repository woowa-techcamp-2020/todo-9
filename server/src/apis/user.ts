import { Router, Request, Response, NextFunction } from 'express'
import { user } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const [users, error] = await promiseHandler(user.read())
  if (error) {
    next(error)
  }

  res.status(200).json(users)
})

app.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  if (!name) {
    throw new Error('request body is wrong')
  }
  const [_, error] = await promiseHandler(user.create(name))

  if (error) {
    next(error)
  }
  res.status(201).json('')
})

export default app
