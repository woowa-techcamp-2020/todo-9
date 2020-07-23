import {
  selectQueryExecuter,
  insertQueryExecuter,
} from '../utils/query-executor'

class User {
  async read() {
    const [users, errorFromGetUsers] = await selectQueryExecuter(
      `SELECT * FROM user;`
    )

    if (errorFromGetUsers) {
      throw errorFromGetUsers
    }

    return users
  }

  async create(name: string) {
    const [insertId, errorFromCreateUser] = await insertQueryExecuter(
      `INSERT INTO user(name) VALUES('${name}')`
    )

    if (errorFromCreateUser) {
      throw errorFromCreateUser
    }

    const [_, errorFromCreateDefaultKanban] = await insertQueryExecuter(
      `INSERT INTO kanban(name, ids, user_id) VALUES
     ('해야할 일', '[]', ${insertId}),
     ('하는 중', '[]', ${insertId}),
     ('다 했어용', '[]', ${insertId})`
    )

    if (errorFromCreateDefaultKanban) {
      throw errorFromCreateDefaultKanban
    }

    return insertId
  }
}

export default new User()
