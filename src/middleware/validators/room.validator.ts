import { check, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateRoomRegistration = [
  check('name').trim().not().isEmpty().
    withMessage('Room name is empty.').isLength({ min: 4, max: 50 }).
    withMessage('Room name must be at least 4 characters.')
]

export const validateRoomDelete = [
  check('id').trim().not().isEmpty().
    withMessage('Room id is empty.')
]

export const validateRoomRestore = [
  check('id').trim().not().isEmpty().
    withMessage('Room id is empty.')
]

export const validateRoomRename = [
  check('id').trim().not().isEmpty().
    withMessage('Room id is empty.'),
  check('newName').trim().not().isEmpty().
    withMessage('Room name is empty.').isLength({ min: 4, max: 50 }).
    withMessage('Room name must be at least 4 characters.')
]

export const roomValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req).array()
    const error = result[0]
    if(error) {
      throw new Error(error.msg);
    }
    next()
  } catch (error) {
    if(error instanceof Error){
      res.status(400).json({ error: { message: error.message } })
    }
    
  }
}