import React, { useContext } from 'react'
import { TodoStatus } from '../models/Todo.model'
import { IoAddCircleOutline } from 'react-icons/io5'
import { DragAndDropContext } from '../Providers/DragAndDropContext'

interface IProps {
  className?: string
  status: TodoStatus
}

const extraClasses = {
  pending: 'bg-orange-100 text-orange-700 ring-orange-700 hover:bg-orange-200',
  completed:
    'bg-emerald-100 text-emerald-700 ring-emerald-700 hover:bg-emerald-200',
  'in-progress':
    'bg-indigo-100 text-indigo-700 ring-indigo-700 hover:bg-indigo-200',
}

const AddTodo = (props: IProps) => {
  const { status } = props

  const { setShowUpdateTodoModal, setCurrentSelectedContainerId } =
    useContext(DragAndDropContext)

  const handleAddClick = () => {
    setShowUpdateTodoModal('add')
    setCurrentSelectedContainerId(status)
  }

  return (
    <button
      name="add-todo"
      onClick={handleAddClick}
      className={`${extraClasses[status]} my-2 mb-3 flex w-fit cursor-pointer items-center justify-start gap-1 rounded-lg bg-gradient-to-r px-3 py-2 ring-2 transition-all`}
    >
      <IoAddCircleOutline size={24} />

      <span>Add Todo</span>
    </button>
  )
}

export default AddTodo
