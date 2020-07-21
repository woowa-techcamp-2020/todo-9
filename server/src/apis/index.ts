import { Router } from 'express'

import { default as userRouter } from './user'
import { default as itemRouter } from './item'
import { default as logRouter } from './log'

const router = Router()

router.use(userRouter)
router.use(itemRouter)

export default router
