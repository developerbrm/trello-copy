import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TodoItem } from '../models/Todo.model'
import { RxDragHandleDots1 } from 'react-icons/rx'
import { MdModeEditOutline } from 'react-icons/md'

interface TodoProps {
  todo: TodoItem
  todoClassName: string
}

const Todo = (props: TodoProps) => {
  const { todo, todoClassName } = props

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`${todoClassName} text-md group mx-3 rounded-lg shadow-sm`}
    >
      <div className="relative grid grid-cols-1">
        <span className="p-3 py-2">{todo.todo}</span>

        <div className="absolute right-0 flex h-full translate-x-1 items-center overflow-hidden bg-white/50 px-3 opacity-0 backdrop-blur-xs transition-all group-hover:translate-x-0 group-hover:opacity-100">
          <button
            name="edit"
            className="grid cursor-pointer place-content-center place-items-center rounded-full p-2 transition-colors hover:bg-white/80"
          >
            <MdModeEditOutline size={18} className="" />
          </button>

          <button
            {...listeners}
            name="drag"
            className="grid cursor-grab place-content-center place-items-center rounded-full p-2 transition-colors hover:bg-white/80"
          >
            <RxDragHandleDots1 size={18} className="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Todo
