import { Router, Request, Response } from 'express'
import { item } from '../schema'
// import User from '../schema/User'
// import init from '../schema'
const app = Router()

app.get('/items', async (req, res) => {
  const items = await item.read()
  console.log(items)
  res.send(items)
})

app.post('/item', async (req: Request, res: Response) => {
  console.log('hello')
  const { content, user_id, kanban_id } = req.body()
  console.log(req.body)
  const newItem = await item.create(content, user_id, kanban_id)
  console.log(newItem)
  res.status(201).json(newItem)
})

export default app
