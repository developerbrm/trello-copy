import { useContext, useEffect, useState } from 'react'
import { DragAndDropContext } from '../Providers/DragAndDropContext'
import { findTodo } from '../utilities'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { addTodo, updateTodo } from '../redux/slices/todoSlice/thunks'
import { TodoItem, TodoStatus } from '../models/Todo.model'
import Spinner from './Spinner'

interface IUpdateTodoModal {
  showUpdateTodoModal: 'add' | 'edit' | null
}

const UpdateTodoModal = (props: IUpdateTodoModal) => {
  const { showUpdateTodoModal } = props

  const dispatch = useAppDispatch()
  const updateTodoState = useAppSelector((state) => state.todos.updateTodo)
  const addTodoState = useAppSelector((state) => state.todos.addTodo)
  const todos = useAppSelector((state) => state.todos.data)

  const isLoading = showUpdateTodoModal
    ? updateTodoState.loading || addTodoState.loading
    : false

  const {
    setCurrentSelectedTodoId,
    setShowUpdateTodoModal,
    currentSelectedTodoId,
    todosMap,
    setCurrentSelectedContainerId,
    currentSelectedContainerId,
  } = useContext(DragAndDropContext)

  const [value, setValue] = useState<string>('')

  const callback = () => {
    closeModal()
  }

  const closeModal = () => {
    setShowUpdateTodoModal(null)

    setValue('')
    setCurrentSelectedTodoId(null)
    setCurrentSelectedContainerId(null)
  }

  const handleUpdate = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (showUpdateTodoModal === 'add' && currentSelectedContainerId) {
      const payload: TodoItem = {
        todo: value,
        completed: currentSelectedContainerId === 'completed',
        id: crypto.randomUUID(),
        userId: todos[0]?.userId,
      }

      dispatch(addTodo({ todo: payload, callback }))

      return
    }

    const todo = findTodo(currentSelectedTodoId, todosMap)

    if (todo) {
      const payload: TodoItem = {
        ...todo,
        todo: value,
      }

      dispatch(updateTodo({ todo: payload, callback }))
    }
  }

  useEffect(() => {
    const todo = findTodo(currentSelectedTodoId, todosMap)

    if (!todo || showUpdateTodoModal === 'add') return

    setValue(() => todo.todo)
  }, [currentSelectedTodoId, showUpdateTodoModal, todosMap])

  return (
    <div
      className={`${showUpdateTodoModal ? '' : 'pointer-events-none opacity-0'} relative z-10 transition-all`}
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className={`${showUpdateTodoModal ? 'bg-white/10 backdrop-blur-sm' : 'backdrop-blur-none'} fixed inset-0 transition-all ease-in`}
        aria-hidden="true"
      ></div>

      <div
        className={`${showUpdateTodoModal ? '' : 'pointer-events-none opacity-0'} fixed inset-0 z-10 w-screen overflow-y-auto transition-opacity`}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl ring ring-zinc-300 transition-all sm:my-8">
            <form onSubmit={handleUpdate}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    {showUpdateTodoModal === 'add' ? 'Add' : 'Edit'} Todo
                  </h3>
                  <div className="mt-2">
                    <textarea
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter something"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setValue(e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full cursor-pointer justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  <div className="relative grid place-content-center place-items-center">
                    <Spinner
                      className={`absolute inset-0 mx-auto aspect-square w-4 transition-all ${isLoading ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <span
                      className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                    >
                      {showUpdateTodoModal === 'add' ? 'Add' : 'Update'}
                    </span>
                  </div>
                </button>
                <button
                  onClick={closeModal}
                  type="button"
                  className="mt-3 inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 transition-colors ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateTodoModal
