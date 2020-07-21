import { app } from '../../app'
import request from 'supertest'
import { item } from '../../schema'
import { Database } from '../../schema/Database'
import { getConnection } from '../../config/db'
import dotenv from 'dotenv'

// beforeAll(async () => {
//   dotenv.config()
//   Database.connectedDB = await getConnection()
// })

test('item with all valid information', async (done) => {
  // given

  // when

  const response = await request(app).get('/api/item')
  //   console.log(response) // expect(response.body).toEqual(expectedResult)

  //   await item.delete(response.id)

  done()
})

// test('item with all valid information', async (done) => {
//   // given

//   const body = {
//     content: 'test create item',
//   }

//   // when
//   const response = await request(app).post('/api/item').send(body)
//   console.log(response.body)
//   //   console.log(response) // expect(response.body).toEqual(expectedResult)

//   //   await item.delete(response.id)

//   done()
// })
