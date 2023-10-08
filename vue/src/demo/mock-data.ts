export interface TodoInfo {
  id: number
  name: string
  sex: string
}
export type TodoList = Array<TodoInfo>

export const todoList: TodoList = [
  {
    id: 11,
    name: 'waker',
    sex: 'male'
  },
  {
    id: 22,
    name: 'cnna',
    sex: 'female'
  },
  {
    id: 33,
    name: 'yasuo',
    sex: 'male'
  },
  {
    id: 44,
    name: 'zed',
    sex: 'male'
  },
  {
    id: 55,
    name: 'katter',
    sex: 'female'
  }
]
