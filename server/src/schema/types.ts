export interface IUser {
  id: number
  name: string
}

export interface IKanban {
  id: number
  name: string
  itemIndexs: number[]
  userName: string
}

export interface IItem {
  id: number
  content: string
}

export interface ILog {}
