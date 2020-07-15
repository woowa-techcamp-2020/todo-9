import dotenv from 'dotenv'
import { getConnection } from './config/db'
import { app } from './app'

dotenv.config()

const PORT = 3000

getConnection()
app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
