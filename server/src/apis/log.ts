import { Router, Request, Response } from 'express'
import { log } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.get('/logs/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params
  const [logs, errorFromGetLogs] = await promiseHandler(log.getAll(userId))
  if (errorFromGetLogs) {
    throw errorFromGetLogs
  }
  console.log(userId, logs)
  res.status(200).json(logs)
})

app.post('/log', async (req: Request, res: Response) => {
  const [_, errorFromCreateLog] = await promiseHandler(log.create(req.body))
  if (errorFromCreateLog) {
    throw errorFromCreateLog
  }

  res.status(201).json('')
})

export default app
