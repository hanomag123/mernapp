import express from "express";
import jwt from 'jsonwebtoken';

const app = express()
const PORT = 4444;


app.get('/', (req, res) => {
  res.send('hello world')
})

app.use(express.json())
app.post('/auth/login', (req, res) => {
  const token = jwt.sign({
    email: req.body.email,
    fullname: 'Vasya Pupkin'
  }, 'secret123')
  console.log(req.body)
  res.json({
    success: true,
    token
  })
})

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Server running on port ${PORT}...`)
})