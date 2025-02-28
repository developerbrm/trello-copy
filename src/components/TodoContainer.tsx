import { useContext } from 'react'
import TodoSection from './TodoSection'
import { DragAndDropContext } from '../Providers/DragAndDropContext'
import { DragOverlay } from '@dnd-kit/core'
import { findTodo } from '../utilities'
import Todo from './Todo'
import { useAppSelector } from '../redux/store'
import Spinner from './Spinner'

const TodoContainer = () => {
  const { dragActiveId, todosMap } = useContext(DragAndDropContext)

  const isAppLoading = useAppSelector((state) => state.todos.loading)
  const todos = useAppSelector((state) => state.todos.data)

  const todoItem = findTodo(dragActiveId, todosMap, 'dragId')

  if (isAppLoading)
    return (
      <div className="fixed inset-0 grid h-screen w-full place-content-center place-items-center bg-white/10 backdrop-blur-xs">
        <Spinner className="aspect-square w-20 !fill-indigo-600 !text-indigo-200" />
      </div>
    )

  return (
    <div className={`${todos.length ? '' : 'opacity-0'}`}>
      <h1 className="mx-auto my-10 text-center text-7xl font-black text-stone-800">
        Trello Copy
      </h1>
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
    </div>
  )
}

export default TodoContainer
