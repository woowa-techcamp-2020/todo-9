import { Router, Request, Response } from 'express'
import { log } from '../schema'
import { promiseHandler } from '../utils/promise-handler'
const app = Router()

app.post('/log', async (req: Request, res: Response) => {
  const [result, errorFromCreateLog] = await promiseHandler(
    log.create(req.body)
  )
  if (errorFromCreateLog) {
    throw errorFromCreateLog
  }

  res.status(201).json()
})

export default app
