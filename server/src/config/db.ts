import mysql from 'mysql2/promise'

export const getConnection = async () => {
  try {
    return await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
    })
  } catch (e) {
    console.error(e)
  }
}

export const executeQuery = async ({ connection, command, option }) => {
  try {
    return await connection.execute(command, option)
  } catch (e) {
    console.error(e)
  }
}
