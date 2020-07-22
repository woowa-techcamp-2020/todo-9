import dotenv from 'dotenv'
dotenv.config()
import { app } from './app'
import { Database } from './schema/Database'
// import { getConnection } from './config/db'
import { pool } from './config/db'
const PORT = 3000

const start = async () => {
  try {
    Database.connectedDB = pool

    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
