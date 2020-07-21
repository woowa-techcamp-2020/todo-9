import { Router } from 'express'

import { default as userRouter } from './user'
import { default as itemRouter } from './item'
import { default as logRouter } from './log'
import { default as kanbanRouter } from './kanban'

const router = Router()

router.use(userRouter)
router.use(itemRouter)
router.use(kanbanRouter)

export default router
