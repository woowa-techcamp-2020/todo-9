import dotenv from 'dotenv'
dotenv.config()

import { app } from '../../app'
import request from 'supertest'
import { user } from '../../schema'
import { Database } from '../../schema/Database'
import { getConnection } from '../../config/db'

beforeAll(async () => {
  Database.connectedDB = await getConnection()
})

test('user with all valid information', async (done) => {
  // given

  // when

  const response = await request(app).get('/api/users')
  //   console.log(response) // expect(response.body).toEqual(expectedResult)

  //   await user.delete(response.id)

  done()
})

test('user with all valid information', async (done) => {
  // given

  const body = {
    name: 'donguk1',
  }

  // when
  // const response = await request(app).post('/api/user').send(body)
  //   console.log(response) // expect(response.body).toEqual(expectedResult)

  //   await user.delete(response.id)

  done()
})

function delay(second) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, second)
  })
}
