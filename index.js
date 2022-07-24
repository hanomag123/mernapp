import express from "express";
import * as PostController from './controllers/PostController.js'
import multer from 'multer'

import mongoose from "mongoose";
import {loginValidator, postCreateValidation, registerValidator} from './validations/auth.js'
import cors from 'cors'



import checkAuth from "./utils/checkAuth.js";
import { getMe, login, register } from "./controllers/UserController.js";
import handkeValidationErrors from "./utils/handkeValidationErrors.js";

mongoose.connect('mongodb+srv://han:12345@cluster0.evarq.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch(err => {console.log('DB err: ', err)})

const app = express()
const PORT = 4444;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage
})

app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

app.post('/upload',checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.post('/auth/login', loginValidator ,handkeValidationErrors, login)

app.post('/auth/register', registerValidator, handkeValidationErrors, register)
app.get('/tags/getAll', PostController.getLastTags)
app.get('/auth/me', checkAuth, getMe)
app.get('/posts/getAll', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, postCreateValidation, PostController.update)
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Server running on port ${PORT}...`)
})