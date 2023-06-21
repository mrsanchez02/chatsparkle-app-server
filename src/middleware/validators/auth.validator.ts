import { check, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const validateUserRegistration = [
  check('firstName').trim().not().isEmpty().
    withMessage('First name is empty.').isLength({ min: 2, max: 35 }).
    withMessage('First name must be at least 2 characters.'),
  check('lastName').trim().not().isEmpty().
    withMessage('Lastname is empty.').isLength({ min: 2, max: 35 }).
    withMessage('Last Name must be at least 2 characters.'),
  check('userName').trim().not().isEmpty().
    withMessage('userName is empty.').isLength({ min: 4, max: 35 }).
    withMessage('UserName must be at least 4 characters.'),
  check('email').normalizeEmail().isEmail().withMessage('Invalid email.'),
  check('password').trim().not().isEmpty().
    withMessage('Password is empty.').isLength({ min: 6 }).
    withMessage('Password must be at least 6 characters long')
]

export const validateUserLogin = [
  check('email').normalizeEmail().isEmail().withMessage('Invalid email.'),
  check('password').trim().not().isEmpty().
    withMessage('Password is empty.').isLength({ min: 6 }).
    withMessage('Password must be at least 6 characters long')
]

export const authValidation = (req: Request, res: Response, next: NextFunction) => {
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