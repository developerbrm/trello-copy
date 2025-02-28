import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { useEffect, useMemo, useState } from 'react'
import UpdateTodoModal from '../components/UpdateTodoModal'
import {
  DragItemType,
  TodoItem,
  TodosMapInterface,
  TodoStatus,
} from '../models/Todo.model'
import { fetchAllTodos, updateTodo } from '../redux/slices/todoSlice/thunks'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { defaultTodosMap, DragAndDropContext } from './DragAndDropContext'
import {
  findTodo,
  findTodoIndex,
  getContainerIds,
  updateTodosMap,
} from '../utilities'
import { updateTodoReduxData } from '../redux/slices/todoSlice'

const DragAndDropProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.data)

  const [todosMap, setTodosMap] = useState<TodosMapInterface>(defaultTodosMap)
  const [showUpdateTodoModal, setShowUpdateTodoModal] = useState<boolean>(false)
  const [currentSelectedTodoId, setCurrentSelectedTodoId] = useState<
    string | null
  >(null)

  const [dragActiveId, setDragActiveId] = useState<UniqueIdentifier | null>(
    null
  )

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
      dragActiveId,
    }),
    [
      todosMap,
      setTodosMap,
      showUpdateTodoModal,
      setShowUpdateTodoModal,
      currentSelectedTodoId,
      setCurrentSelectedTodoId,
      dragActiveId,
    ]
  )

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  useEffect(() => {
    if (!todos.length) return

    setTodosMap((prevState) => updateTodosMap(todos, prevState))
  }, [todos])

  function handleDragStart(event: DragStartEvent) {
    setDragActiveId(event.active.id)
  }

  function handleDragEnd(event: DragMoveEvent) {
    const { over, active } = event

    if (!over || !active || active.id === over.id) return

    const activeItemDragId = active.id
    const overItemDragId = over.id

    const activeItem = findTodo(activeItemDragId, todos, 'dragId')
    const overItem = findTodo(overItemDragId, todos, 'dragId')
    const finalStatus = getContainerIds(todosMap).includes(over.id)
      ? over.id
      : overItem?.status

    //  sorting in same section
    if (activeItem?.status === overItem?.status) {
      if (!activeItem?.dragId || !overItem?.dragId) return

      const oldIndex = findTodoIndex(activeItem.dragId, todos, 'dragId')
      const newIndex = findTodoIndex(overItem.dragId, todos, 'dragId')

      const newTodos = arrayMove(todos, oldIndex, newIndex)
      dispatch(updateTodoReduxData(newTodos))
    } else {
      // move item to another section

      if (!activeItem?.id || !finalStatus) return

      const payload: TodoItem = {
        ...activeItem,
        status: finalStatus,
      }

      const newTodos: TodoItem[] = todos.map((todo) =>
        todo.id === activeItem.id ? payload : todo
      )

      dispatch(updateTodoReduxData(newTodos))

      if (activeItem.status !== finalStatus) {
        dispatch(updateTodo({ todo: payload, updateRedux: false }))
      }
    }

    setDragActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <DragAndDropContext.Provider value={contextValue}>
        {children}

        {showUpdateTodoModal && <UpdateTodoModal />}
      </DragAndDropContext.Provider>
    </DndContext>
  )
}

export default DragAndDropProvider
