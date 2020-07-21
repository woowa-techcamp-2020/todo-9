import { Router, Request, Response, NextFunction } from 'express'
import { user } from '../schema'
const app = Router()

app.get('/users', async (req: Request, res: Response) => {
  const users = await user.read()
  res.status(200).json(users)
})

app.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const insertId = await user.create(name)
  if (!insertId) {
    next(new Error("Can't create user"))
  }
  res.status(201).json()
})

export default app
