import { useContext, useEffect, useState } from 'react'
import { DragAndDropContext } from '../Providers/DragAndDropContext'
import { findTodo } from '../utilities'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { updateTodo } from '../redux/slices/todoSlice/thunks'
import { TodoItem } from '../models/Todo.model'
import Spinner from './Spinner'

const UpdateTodoModal = () => {
  const dispatch = useAppDispatch()
  const updateTodoState = useAppSelector((state) => state.todos.updateTodo)

  const {
    setCurrentSelectedTodoId,
    setShowUpdateTodoModal,
    currentSelectedTodoId,
    todosMap,
  } = useContext(DragAndDropContext)

  const [value, setValue] = useState<string>('')

  const closeModal = () => {
    setCurrentSelectedTodoId(null)
    setShowUpdateTodoModal(false)
  }

  const handleUpdate = () => {
    const todo = findTodo(currentSelectedTodoId, todosMap)
    if (!todo) return

    const payload: TodoItem = {
      ...todo,
      todo: value,
    }

    const callback = () => {
      closeModal()
    }

    dispatch(updateTodo({ todo: payload, callback }))
  }

  useEffect(() => {
    const todo = findTodo(currentSelectedTodoId, todosMap)

    if (!todo) return

    setValue(() => todo.todo)
  }, [currentSelectedTodoId, todosMap])

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    Update Todo
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
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                disabled={updateTodoState.loading}
                className="inline-flex w-full cursor-pointer justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={handleUpdate}
              >
                <div className="relative grid place-content-center place-items-center">
                  <Spinner
                    className={`absolute inset-0 mx-auto aspect-square w-4 transition-all ${updateTodoState.loading ? 'opacity-100' : 'opacity-0'}`}
                  />
                  <span
                    className={`${updateTodoState.loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                  >
                    Update
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateTodoModal
