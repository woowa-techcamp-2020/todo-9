import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  // waitForConnections: false,
  // connectionLimit: 10,
})

export const executeQuery = async ({ connection, command, option }) => {
  try {
    return await connection.execute(command, option)
  } catch (e) {
    console.error(e)
  }
}
