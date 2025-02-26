import { UiState } from '../utilities'

export interface TodoState extends UiState {
  data: TodoItem[]
}

export type TodoStatus = 'pending' | 'in-progress' | 'completed'

export interface TodoItem {
  id: number
  todo: string
  completed?: boolean
  userId: number
  status?: TodoStatus
}
