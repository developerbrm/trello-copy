import { useContext } from 'react'
import TodoSection from './TodoSection'
import { DragAndDropContext } from '../Providers/DragAndDropContext'
import { DragOverlay } from '@dnd-kit/core'
import { findTodo } from '../utilities'
import Todo from './Todo'

const TodoContainer = () => {
  const { dragActiveId, todosMap } = useContext(DragAndDropContext)

  const todoItem = findTodo(dragActiveId, todosMap, 'dragId')

  return (
    <>
      <div className="container m-10 mx-auto grid w-[min(90%,1200px)] auto-rows-fr grid-cols-1 justify-between gap-5 md:grid-cols-2 lg:grid-cols-3">
        <TodoSection status="pending" />
        <TodoSection status="in-progress" />
        <TodoSection status="completed" />
      </div>

      <DragOverlay>
        {dragActiveId && todoItem ? (
          <Todo
            todo={todoItem}
            todoClassName="bg-slate-100 ring-1 opacity-80 ring-slate-800"
          />
        ) : null}
      </DragOverlay>
    </>
  )
}

export default TodoContainer
