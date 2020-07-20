import { Router } from 'express'

import { default as userRouter } from './user'

const router = Router()

router.use(userRouter)

export default router
