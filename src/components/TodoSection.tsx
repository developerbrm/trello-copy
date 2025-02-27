import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import { TodoStatus } from '../models/Todo.model'
import { getSectionData } from '../utilities'
import Todo from './Todo'
import { DragAndDropContext } from '../Providers/DragAndDropContext'

interface ITodoSection {
  status: TodoStatus
}

const TodoSection = (props: ITodoSection) => {
  const { status } = props
  const { todosMap } = useContext(DragAndDropContext)

  const {
    todos,
    heading,
    sectionClassName,
    sectionHeadingClassName,
    todoClassName,
  } = getSectionData(status, todosMap)

  return (
    <SortableContext items={todos} strategy={verticalListSortingStrategy}>
      <div
        className={`${sectionHeadingClassName} rounded-lg bg-gradient-to-br p-2 shadow-md`}
      >
        <div
          className={`${sectionClassName} h-full w-full rounded-lg bg-white backdrop-blur-sm`}
        >
          <div className="mb-3 grid max-h-[80vh] w-full gap-2 overflow-auto">
            <h3
              className={`${sectionHeadingClassName} sticky top-0 z-10 bg-gradient-to-r bg-clip-text pb-0 text-3xl font-bold text-transparent backdrop-blur-2xl`}
            >
              <div className="m-3">{heading}</div>
              <hr
                className={`${sectionHeadingClassName} my-1 h-0.5 border-0 bg-gradient-to-r opacity-20`}
              />
            </h3>

            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} todoClassName={todoClassName} />
            ))}
          </div>
        </div>
      </div>
    </SortableContext>
  )
}

export default TodoSection
