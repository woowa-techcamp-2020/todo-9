import express from 'express'
import apis from './apis'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// api
app.use('/api', apis)

// app.get('/*', (req, res) => {
//   // res.sendFile(__dirname + '/public/index.html')
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// })

export { app }
