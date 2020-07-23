import dotenv from 'dotenv'
dotenv.config()
import { app } from './app'
const PORT = 3000

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`))
  } catch (e) {
    console.error(e)
  }
}

start()
