import express from 'express'
import apis from './apis'

const app = express()

app.use('/apis', apis)

app.get('/*', (req, res) => {
  res.send('hello')
})

export { app }
