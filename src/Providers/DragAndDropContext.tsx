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
  showUpdateTodoModal: null,
  setShowUpdateTodoModal: () => false,
  currentSelectedTodoId: null,
  setCurrentSelectedTodoId: () => null,
  currentSelectedContainerId: null,
  setCurrentSelectedContainerId: () => null,
  dragActiveId: null,
}

export const DragAndDropContext =
  createContext<DragAndDropContextInterface>(defaultContextValue)
