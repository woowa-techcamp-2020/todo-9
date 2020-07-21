import { app } from '../../app'
import request from 'supertest'
import { user } from '../../schema'
import { Database } from '../../schema/Database'
import { getConnection } from '../../config/db'
import dotenv from 'dotenv'

beforeAll(async () => {
  dotenv.config()
  Database.connectedDB = await getConnection()
  console.log(Database.connectedDB)
})

test('user with all valid information', async (done) => {
  // given

  // when

  const response = await request(app).get('/api/user')
  //   console.log(response) // expect(response.body).toEqual(expectedResult)

  //   await user.delete(response.id)

  done()
})

test('user with all valid information', async (done) => {
  // given

  const body = {
    name: 'hello',
  }

  // when
  const response = await request(app).post('/api/user').send(body)
  console.log(response.body)
  //   console.log(response) // expect(response.body).toEqual(expectedResult)

  //   await user.delete(response.id)

  done()
})
