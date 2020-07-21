import { Router, Request, Response } from 'express'
import { user } from '../schema'
// import User from '../schema/User'
// import init from '../schema'
const app = Router()

app.get('/users', (req: Request, res: Response) => {
  // user.create('hello')
  res.status(200).json()
})

app.post('/user', async (req: Request, res: Response) => {
  const { name } = req.body
  const newItem = await user.create(name)
  console.log(newItem)
  res.status(201).json(newItem)
})

export default app
