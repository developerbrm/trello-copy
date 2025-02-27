import { UiState } from '../utilities'

export interface TodoState extends UiState {
  data: TodoItem[]
  updateTodo: UiState
}

export type TodoStatus = 'pending' | 'in-progress' | 'completed'

export interface TodoItem {
  id: string
  todo: string
  completed?: boolean
  userId: number
  status: TodoStatus
}

export interface DragAndDropContextInterface {
  todosMap: TodosMapInterface
  setTodosMap: React.Dispatch<React.SetStateAction<TodosMapInterface>>
  showUpdateTodoModal: boolean
  setShowUpdateTodoModal: React.Dispatch<React.SetStateAction<boolean>>
  currentSelectedTodoId: null | string
  setCurrentSelectedTodoId: React.Dispatch<React.SetStateAction<string | null>>
}

export type TodosMapInterface = Map<TodoStatus, TodoItem[]>
