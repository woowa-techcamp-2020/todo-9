import { Database } from './Database'

class User {
  private dbCon

  constructor() {
    this.dbCon = Database.connectedDB
  }

  create(name: string) {
    this.dbCon
  }
}

export default new User()
