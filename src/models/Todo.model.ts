import { UniqueIdentifier } from '@dnd-kit/core'
import { UiState } from '../utilities'

export interface TodoState extends UiState {
  data: TodoItem[]
  updateTodo: UiState
  addTodo: UiState
}

export type TodoStatus = 'pending' | 'in-progress' | 'completed'

export interface TodoItem {
  id: string | number
  todo: string
  completed?: boolean
  userId?: string
  status?: TodoStatus
  dragId?: UniqueIdentifier
}

export interface DragAndDropContextInterface {
  todosMap: TodosMapInterface
  setTodosMap: React.Dispatch<React.SetStateAction<TodosMapInterface>>
  showUpdateTodoModal: 'add' | 'edit' | null
  setShowUpdateTodoModal: React.Dispatch<
    React.SetStateAction<'add' | 'edit' | null>
  >
  currentSelectedTodoId: null | string
  setCurrentSelectedTodoId: React.Dispatch<React.SetStateAction<string | null>>
  currentSelectedContainerId: null | TodoStatus
  setCurrentSelectedContainerId: React.Dispatch<
    React.SetStateAction<TodoStatus | null>
  >
  dragActiveId: UniqueIdentifier | null
}

export type TodosMapInterface = Map<TodoStatus, TodoItem[]>

export type DragItemType = 'container' | 'item'
