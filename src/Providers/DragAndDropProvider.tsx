import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { useEffect, useMemo, useState } from 'react'
import UpdateTodoModal from '../components/UpdateTodoModal'
import { TodosMapInterface } from '../models/Todo.model'
import { fetchAllTodos } from '../redux/slices/todoSlice/thunks'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { defaultTodosMap, DragAndDropContext } from './DragAndDropContext'
import { updateTodosMap } from '../utilities'

const DragAndDropProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.data)

  const [todosMap, setTodosMap] = useState<TodosMapInterface>(defaultTodosMap)
  const [showUpdateTodoModal, setShowUpdateTodoModal] = useState<boolean>(false)
  const [currentSelectedTodoId, setCurrentSelectedTodoId] = useState<
    string | null
  >(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const contextValue = useMemo(
    () => ({
      todosMap,
      setTodosMap,
      showUpdateTodoModal,
      setShowUpdateTodoModal,
      currentSelectedTodoId,
      setCurrentSelectedTodoId,
    }),
    [
      todosMap,
      setTodosMap,
      showUpdateTodoModal,
      setShowUpdateTodoModal,
      currentSelectedTodoId,
      setCurrentSelectedTodoId,
    ]
  )

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  useEffect(() => {
    console.log(todos)
    if (!todos.length) return

    setTodosMap((prevState) => updateTodosMap(todos, prevState))
  }, [todos])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <DragAndDropContext.Provider value={contextValue}>
        {children}

        {showUpdateTodoModal && <UpdateTodoModal />}
      </DragAndDropContext.Provider>
    </DndContext>
  )

  function handleDragEnd(event) {
    const { active, over } = event

    // if (active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id)
    //     const newIndex = items.indexOf(over.id)

    //     return arrayMove(items, oldIndex, newIndex)
    //   })
    // }
  }
}

export default DragAndDropProvider
