import { Router } from 'express'
import { LoginUser, registerNewUser, profile, logoutUser, removeUser, recoverUser } from '../../controllers/auth.controllers'
import { TokenValidation } from '../../middleware/verifyToken'
import { validateUserRegistration, validateUserLogin, authValidation, validateUserRecover, } from '../../middleware/validators/auth.validator'

const router = Router()

router.post('/register', validateUserRegistration, authValidation, registerNewUser)
router.post('/login', validateUserLogin, authValidation, LoginUser)
router.get('/profile', TokenValidation, profile)
router.post('/logout', TokenValidation, logoutUser)
router.delete('/remove-user', TokenValidation, validateUserLogin, authValidation, removeUser)
router.post('/recover-user', TokenValidation, validateUserRecover, authValidation, recoverUser)

export default router
