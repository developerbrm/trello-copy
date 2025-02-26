import React, { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppSelector } from '../redux/store'
import { TodoItem } from '../redux/slices/todoSlice/interface'

function SortableItem({ todo }: { todo: TodoItem }) {
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
      className="m-5 my-2 rounded-sm bg-yellow-600 p-4 text-lg"
    >
      {todo.todo}
    </div>
  )
}

const DragAndDropProvider = () => {
  const todos = useAppSelector((state) => state.todos.data)
  const [myTodos, setMyTodos] = useState(todos)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setMyTodos(todos)
  }, [todos])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={myTodos} strategy={verticalListSortingStrategy}>
        {myTodos.map((todo) => (
          <SortableItem key={todo.id} todo={todo} />
        ))}
      </SortableContext>
    </DndContext>
  )

  function handleDragEnd(event) {
    console.log(event)
    const { active, over } = event

    if (active.id !== over.id) {
      setMyTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const data = arrayMove(items, oldIndex, newIndex)

        console.log(data, oldIndex, newIndex)

        return data
      })
    }
  }
}

export default DragAndDropProvider
