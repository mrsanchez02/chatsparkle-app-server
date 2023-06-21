import { Router } from 'express'
import { createNewRoom, removeRoom } from '../../controllers/room.controllers'
import { roomValidation, validateRoomDelete, validateRoomRegistration } from '../../middleware/validators/room.validator'
import { TokenValidation } from '../../middleware/verifyToken'

const router = Router()

router.post('/new-room', TokenValidation, validateRoomRegistration, roomValidation, createNewRoom)
router.delete('/delete-room', TokenValidation, validateRoomDelete, roomValidation, removeRoom)

export default router
