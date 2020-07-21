import dotenv from 'dotenv'
import { app } from './app'
import { Database } from './schema/Database'
import { getConnection } from './config/db'

const PORT = 3000

const start = async () => {
  try {
    dotenv.config()
    Database.connectedDB = await getConnection()
    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
