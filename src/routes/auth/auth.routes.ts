import { Router } from 'express'
import { LoginUser, registerNewUser, profile, logoutUser } from '../../controllers/auth.controllers'
import { TokenValidation } from '../../middleware/verifyToken'
import { validateUserRegistration, validateUserLogin, authValidation, } from '../../middleware/validators/auth.validator'

const router = Router()

router.post('/register', validateUserRegistration, authValidation, registerNewUser)
router.post('/login', validateUserLogin, authValidation, LoginUser)
router.get('/profile', TokenValidation, profile)
router.post('/logout', TokenValidation, logoutUser)

export default router
