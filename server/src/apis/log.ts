import { Router, Request, Response } from 'express'
import { user } from '../schema'
// import User from '../schema/User'
// import init from '../schema'
const app = Router()

app.get('/users', (req: Request, res: Response) => {
  user.create('hello')
  res.status(200).json()
})

app.post('/user', async (req: Request, res: Response) => {
  user.create('hello')
  // const newUser = await ~~
  res.status(201).json()
})

export default app
