import { UiState } from '../../../utilities'

export interface TodoState extends UiState {
  data: TodoItem[]
}

export interface TodoItem {
  id: number
  todo: string
  completed: boolean
  userId: number
}
