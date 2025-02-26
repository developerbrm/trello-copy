import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import { TodoItem, TodosMapInterface, TodoStatus } from '../models/Todo.model'
import { DragAndDropContext } from '../Providers/DragAndDropProvider'
import Todo from './Todo'

interface ITodoSection {
  status: TodoStatus
}

interface ISectionData {
  [key: string]: {
    todos: TodoItem[]
    heading: string
    sectionClassName: string
    todoClassName: string
  }
}

const getSectionData = (status: TodoStatus, todosMap: TodosMapInterface) => {
  const obj: ISectionData = {
    pending: {
      todos: todosMap.get('pending') ?? [],
      heading: 'Pending',
      sectionClassName: 'bg-orange-500',
      todoClassName: 'bg-orange-200 text-orange-950',
    },
    completed: {
      todos: todosMap.get('completed') ?? [],
      heading: 'Completed',
      sectionClassName: 'bg-green-500',
      todoClassName: 'bg-green-200 text-green-950',
    },
    'in-progress': {
      todos: todosMap.get('in-progress') ?? [],
      heading: 'In Progress',
      sectionClassName: 'bg-blue-500',
      todoClassName: 'bg-blue-200 text-blue-950',
    },
  }

  return obj[status]
}

const TodoSection = (props: ITodoSection) => {
  const { status } = props
  const { todosMap } = useContext(DragAndDropContext)

  const { todos, heading, sectionClassName, todoClassName } = getSectionData(
    status,
    todosMap
  )

  return (
    <SortableContext items={todos} strategy={verticalListSortingStrategy}>
      <div className={`${sectionClassName} rounded-lg p-3 shadow`}>
        <h3 className="my-2 mb-4 text-2xl font-bold text-white">
          <span>{heading}</span>

          <hr className="my-2 rounded-full border-0 ring ring-white/80" />
        </h3>

        <div className="grid gap-4">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} todoClassName={todoClassName} />
          ))}
        </div>
      </div>
    </SortableContext>
  )
}

export default TodoSection
