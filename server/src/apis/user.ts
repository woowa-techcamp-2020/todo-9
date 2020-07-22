import { Router, Request, Response, NextFunction } from 'express'
import { user } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.get('/users', async (req: Request, res: Response) => {
  const [users, getUsersError] = await promiseHandler(user.read())
  if (getUsersError) {
    console.error(getUsersError)
    throw getUsersError
  }

  res.status(200).json(users)
})

app.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  const insertId = await promiseHandler(user.create(name))
  // need to fix

  if (!insertId) {
    next(new Error("Can't create user"))
  }
  res.status(201).json()
})

export default app
