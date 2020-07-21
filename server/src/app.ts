import express from 'express'
import apis from './apis'
import bodyParser from 'body-parser'
import appRoot from 'app-root-path'
import cors from 'cors'

const app = express()

// middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// api
app.use('/api', apis)

app.use(express.static(appRoot.resolve('/src/public')))

app.get('/*', (req, res) => {
  // res.sendFile(__dirname + '/public/index.html')
  res.sendFile(appRoot.resolve('/src/public/index.html'))

  //   res.sendFile(path.join(__dirname, '/public/index.html'))
})

export { app }
