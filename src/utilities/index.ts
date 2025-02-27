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
    sectionHeadingClassName: string
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
      sectionClassName: 'ring-orange-600 ',
      todoClassName: 'bg-orange-200 text-orange-900',
      sectionHeadingClassName: 'from-orange-600 via-orange-400 to-orange-900',
    },
    completed: {
      todos: todosMap.get('completed') ?? [],
      heading: 'Completed',
      sectionClassName: 'ring-emerald-600',
      todoClassName: 'bg-emerald-200 text-emerald-900',
      sectionHeadingClassName:
        'from-emerald-600 via-emerald-400 to-emerald-900',
    },
    'in-progress': {
      todos: todosMap.get('in-progress') ?? [],
      heading: 'In Progress',
      sectionClassName: 'ring-indigo-600',
      todoClassName: 'bg-indigo-200 text-indigo-900',
      sectionHeadingClassName: 'from-indigo-600 via-indigo-400 to-indigo-900',
    },
  }

  return obj[status]
}

export const findTodo = (id: string | null, todosMap: TodosMapInterface) => {
  if (!id) return

  const match = [...todosMap.values()].flat().find((todo) => todo.id === id)
  return match
}

export const convertTodoItem = (todo: TodoItem) => {
  const obj = { ...todo }

  obj.id = todo.id.toString()
  obj.status = todo.completed ? 'completed' : 'pending'
  delete obj.completed

  return obj
}

const filterTodos = (todos: TodoItem[], status: TodoStatus) =>
  todos.filter((t) => t.status === status)

export const updateTodosMap = (
  todos: TodoItem[],
  prevMap: TodosMapInterface
) => {
  const map = new Map(prevMap)

  map.set('pending', filterTodos(todos, 'pending'))
  map.set('in-progress', filterTodos(todos, 'in-progress'))
  map.set('completed', filterTodos(todos, 'completed'))

  return map
}
