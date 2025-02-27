import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import { TodoStatus } from '../models/Todo.model'
import { DragAndDropContext } from '../Providers/DragAndDropProvider'
import { getSectionData } from '../utilities'
import Todo from './Todo'

interface ITodoSection {
  status: TodoStatus
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
      <div
        className={`${sectionClassName} max-h-[80vh] overflow-auto rounded-lg bg-gradient-to-br shadow-md`}
      >
        <h3 className="sticky top-0 z-10 p-3 text-2xl font-bold text-white">
          <span>{heading}</span>
          <hr className="my-2 rounded-full border-0 ring ring-white/50" />
        </h3>

        <div className="grid gap-2 p-3 pt-0">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} todoClassName={todoClassName} />
          ))}
        </div>
      </div>
    </SortableContext>
  )
}

export default TodoSection
