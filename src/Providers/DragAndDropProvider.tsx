import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import {
  DragAndDropContextInterface,
  TodosMapInterface,
} from '../models/Todo.model'
import { fetchAllTodos } from '../redux/slices/todoSlice/thunks'
import { useAppDispatch, useAppSelector } from '../redux/store'

const defaultTodosMap: TodosMapInterface = new Map()

defaultTodosMap.set('pending', [])
defaultTodosMap.set('completed', [])
defaultTodosMap.set('in-progress', [])

const defaultContextValue = {
  todosMap: defaultTodosMap,
  setTodosMap: () => defaultTodosMap,
}

export const DragAndDropContext =
  createContext<DragAndDropContextInterface>(defaultContextValue)

const DragAndDropProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.data)

  const [todosMap, setTodosMap] = useState<TodosMapInterface>(defaultTodosMap)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const contextValue = useMemo(
    () => ({ todosMap, setTodosMap }),
    [todosMap, setTodosMap]
  )

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  useEffect(() => {
    if (!todos.length) return

    setTodosMap((prevState) => {
      const map = new Map(prevState)

      todos.forEach((todo) => {
        const todosArr = map.get(todo.status) ?? []
        if (!todosArr.some((item) => item.id === todo.id)) {
          map.set(todo.status, [...todosArr, todo])
        }
      })

      return map
    })
  }, [todos])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <DragAndDropContext.Provider value={contextValue}>
        {children}
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
