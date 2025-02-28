import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useContext } from 'react'
import { TodoStatus } from '../models/Todo.model'
import { DragAndDropContext } from '../Providers/DragAndDropContext'
import { getContainerIds, getItemIds, getSectionData } from '../utilities'
import Todo from './Todo'
import { RxDragHandleDots1 } from 'react-icons/rx'

interface ITodoSection {
  status: TodoStatus
}

const TodoSection = (props: ITodoSection) => {
  const { status } = props
  const { todosMap, dragActiveId } = useContext(DragAndDropContext)

  const {
    todos,
    heading,
    sectionClassName,
    sectionHeadingClassName,
    todoClassName,
  } = getSectionData(status, todosMap)

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: status,
    data: {
      type: 'container',
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <SortableContext
      items={getContainerIds(todosMap)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={`${sectionHeadingClassName} ${isDragging ? 'opacity-50' : ''} rounded-lg bg-gradient-to-br p-2 shadow-md transition-opacity`}
      >
        <div
          className={`${sectionClassName} h-full w-full rounded-lg bg-white backdrop-blur-sm`}
        >
          <div className="mb-3 grid max-h-[80vh] w-full gap-2 overflow-x-hidden overflow-y-auto">
            <h3
              className={`${sectionHeadingClassName} sticky top-0 z-10 bg-gradient-to-r bg-clip-text pb-0 text-3xl font-bold text-transparent backdrop-blur-2xl`}
            >
              <div className="m-3 flex items-center justify-start">
                <RxDragHandleDots1
                  {...listeners}
                  size={22}
                  className="cursor-grab text-slate-700"
                />
                <span>{heading}</span>
              </div>
              <hr
                className={`${sectionHeadingClassName} my-1 h-0.5 border-0 bg-gradient-to-r opacity-20`}
              />
            </h3>

            <SortableContext
              disabled={dragActiveId !== null}
              items={getItemIds(todosMap, status)}
              strategy={verticalListSortingStrategy}
            >
              {todos.map((todo) => (
                <Todo key={todo.id} todo={todo} todoClassName={todoClassName} />
              ))}
            </SortableContext>
          </div>
        </div>
      </div>
    </SortableContext>
  )
}

export default TodoSection
