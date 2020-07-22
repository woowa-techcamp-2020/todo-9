import { Router, Request, Response, NextFunction } from 'express'
import { user } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.get('/users', async (req: Request, res: Response) => {
  const [users, errorFromGetUsers] = await promiseHandler(user.read())
  if (errorFromGetUsers) {
    throw errorFromGetUsers
  }

  res.status(200).json(users)
})

app.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body
  if (!name) {
    throw new Error('request body is wrong')
  }
  const [insertId, errorFromCreateUser] = await promiseHandler(
    user.create(name)
  )

  if (!insertId || errorFromCreateUser) {
    throw new Error("Can't create user")
  }
  res.status(201).json()
})

export default app
