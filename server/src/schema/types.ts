export interface IUser {
  id: number
  name: string
}

export interface IKanban {
  id: number
  name: string
  itemIndexes: number[]
  userName: string
}

export interface IItem {
  id: number
  content: string
}

export interface ILog {
  id: number
  methodType: 'add' | 'delete' | 'update' | 'move'
  type: 'item' | 'kanban'
  originName: string
  targetName: string
  itemName: string
  createAt: Date
}
