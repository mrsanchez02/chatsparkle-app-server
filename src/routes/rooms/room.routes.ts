import { Router } from 'express'
import { createNewRoom, getAllRoomsActualUser, getOneRoomActualuser, recoverRoom, removeRoom, renameRoom } from '../../controllers/room.controllers'
import { roomValidation, validateRoomDelete, validateRoomRegistration, validateRoomRename, validateRoomRestore } from '../../middleware/validators/room.validator'
import { TokenValidation } from '../../middleware/verifyToken'

const router = Router()

router.post('/new-room', TokenValidation, validateRoomRegistration, roomValidation, createNewRoom)
router.delete('/delete-room/:id', TokenValidation, validateRoomDelete, roomValidation, removeRoom)
router.get('/my-rooms', TokenValidation, getAllRoomsActualUser)
router.get('/room/:id', TokenValidation, getOneRoomActualuser)
router.post('/restore-room', TokenValidation, validateRoomRestore, roomValidation, recoverRoom)
router.patch('/rename-room', TokenValidation, validateRoomRename, roomValidation, renameRoom)


export default router
