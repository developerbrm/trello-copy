import { TodoItem, TodosMapInterface, TodoStatus } from '../models/Todo.model'

export type UiState = {
  data: unknown
  loading: boolean
  error: Error | null
}

export const createInitialState = (): UiState => ({
  data: [],
  loading: false,
  error: null,
})

interface ISectionData {
  [key: string]: {
    todos: TodoItem[]
    heading: string
    sectionClassName: string
    todoClassName: string
  }
}

export const getSectionData = (
  status: TodoStatus,
  todosMap: TodosMapInterface
) => {
  const obj: ISectionData = {
    pending: {
      todos: todosMap.get('pending') ?? [],
      heading: 'Pending',
      sectionClassName: 'from-orange-500 via-orange-600 to-orange-800',
      todoClassName: 'bg-orange-200 text-orange-900',
    },
    completed: {
      todos: todosMap.get('completed') ?? [],
      heading: 'Completed',
      sectionClassName: 'from-emerald-500 via-emerald-600 to-emerald-800',
      todoClassName: 'bg-emerald-200 text-emerald-900',
    },
    'in-progress': {
      todos: todosMap.get('in-progress') ?? [],
      heading: 'In Progress',
      sectionClassName: 'from-indigo-500 via-indigo-600 to-indigo-800',
      todoClassName: 'bg-indigo-200 text-indigo-900',
    },
  }

  return obj[status]
}
