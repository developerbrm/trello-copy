import { useEffect } from 'react'
import { fetchAllTodos } from '../redux/slices/todoSlice/thunks'
import { useAppDispatch, useAppSelector } from '../redux/store'
import DragAndDropProvider from '../Providers/DragAndDropProvider'

const TodoContainer = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.data)

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  return (
    <>
      <DragAndDropProvider />
      <div className="grid h-screen w-full grid-flow-col place-content-center gap-4">
        <div
          draggable
          className="aspect-square w-20 rounded-sm bg-rose-400"
        ></div>
        <div className="aspect-square w-20 rounded-sm bg-sky-400"></div>
        <div className="aspect-square w-20 rounded-sm bg-pink-400"></div>
        <div className="aspect-square w-20 rounded-sm bg-yellow-400"></div>
      </div>

      {/* <div className="container mx-auto max-w-prose space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="rounded-sm bg-yellow-600 p-4 text-lg">
            {todo.todo}
          </div>
        ))}
      </div> */}
    </>
  )
}

export default TodoContainer
