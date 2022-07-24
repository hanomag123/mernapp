import {body} from 'express-validator'

export const registerValidator = [
  body('email', 'Wrong Email').isEmail(),
  body('password', 'Wrong Password').isStrongPassword(),
  body('fullName', 'Wrong fullname').isLength({min: 3}),
  body('avatarUrl', 'Not an').optional().isURL()
]

export const postCreateValidation = [
  body('title', 'Inter the title of article').isLength({min: 3}).isString(),
  body('text', 'Inter the text of article').isLength({min: 10}).isString(),
  body('tags', 'Inter the right tag of article').optional().isString(),
body('imageUrl', 'Incorrect link of the image').optional().isString()
]

export const loginValidator = [
  body('email', 'Wrong Email').isEmail(),
  body('password', 'Wrong Password').isStrongPassword(),
  body('avatarUrl', 'Not an').optional().isURL()
]

