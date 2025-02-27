import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { TodoItem } from '../models/Todo.model'

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
      {...listeners}
      className={`${todoClassName} text-md mx-3 rounded-lg p-4 py-2 shadow-lg`}
    >
      {todo.todo}
    </div>
  )
}

export default Todo
