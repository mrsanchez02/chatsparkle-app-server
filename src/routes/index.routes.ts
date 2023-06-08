import {Router } from 'express'
import UserRoutes from './auth/auth.routes'

const router = Router()

router.use('/', UserRoutes)

export default router;
