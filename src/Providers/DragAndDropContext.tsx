import { createContext } from 'react'
import {
  DragAndDropContextInterface,
  TodosMapInterface,
} from '../models/Todo.model'

export const defaultTodosMap: TodosMapInterface = new Map()

defaultTodosMap.set('pending', [])
defaultTodosMap.set('completed', [])
defaultTodosMap.set('in-progress', [])

const defaultContextValue = {
  todosMap: defaultTodosMap,
  setTodosMap: () => defaultTodosMap,
  showUpdateTodoModal: false,
  setShowUpdateTodoModal: () => false,
  currentSelectedTodoId: null,
  setCurrentSelectedTodoId: () => null,
  dragActiveId: null,
}

export const DragAndDropContext =
  createContext<DragAndDropContextInterface>(defaultContextValue)
