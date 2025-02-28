import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  convertTodoItem,
  createInitialState,
  findTodoIndex,
} from '../../../utilities'
import { addTodo, fetchAllTodos, updateTodo } from './thunks'
import { TodoItem, TodoState, TodoStatus } from '../../../models/Todo.model'

const initialState: TodoState = createInitialState() as TodoState

initialState.data = []
initialState.updateTodo = createInitialState()
initialState.addTodo = createInitialState()

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateTodoReduxData: (state, action: { payload: TodoItem[] }) => {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    // fetch all todos
    builder.addCase(fetchAllTodos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.loading = false
      state.data = action?.payload || []
    })
    builder.addCase(fetchAllTodos.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.error = action.error as Error
    })

    // update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.updateTodo.loading = true
    })
    builder.addCase(
      updateTodo.fulfilled,
      (
        state,
        action: PayloadAction<
          void | { data: TodoItem; updateRedux: boolean },
          string,
          {
            arg: {
              todo: TodoItem
              callback?: (() => void) | undefined
              updateRedux?: boolean | undefined
            }
            requestId: string
            requestStatus: 'fulfilled'
          },
          never
        >
      ) => {
        if (!action.payload) return

        const newTodo = convertTodoItem(action?.payload.data, false) ?? []

        state.updateTodo.loading = false
        state.updateTodo.data = newTodo

        if (!action.payload.updateRedux) return

        // update all todos
        state.data = state.data.map((todo) => {
          if (todo.id === newTodo?.id) {
            return newTodo
          }
          return todo
        })
      }
    )
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.updateTodo.data = []
      state.updateTodo.loading = false
      state.updateTodo.error = action.error as Error
    })

    // add todo
    builder.addCase(addTodo.pending, (state) => {
      state.addTodo.loading = true
    })
    builder.addCase(
      addTodo.fulfilled,
      (
        state,
        action: PayloadAction<
          void | {
            data: TodoItem
            updateRedux: boolean
            currentSelectedContainerId: TodoStatus | undefined
          },
          string,
          {
            arg: {
              todo: TodoItem
              callback?: (() => void) | undefined
              updateRedux?: boolean | undefined
              currentSelectedContainerId?: TodoStatus | undefined
            }
            requestId: string
            requestStatus: 'fulfilled'
          },
          never
        >
      ) => {
        if (!action.payload) return

        const newTodo =
          convertTodoItem(
            action?.payload.data,
            false,
            action.payload.currentSelectedContainerId
          ) ?? []

        state.addTodo.loading = false
        state.addTodo.data = newTodo

        if (!action.payload.updateRedux) return

        const matchFound = findTodoIndex(newTodo.id, state.data, 'id') !== -1

        if (matchFound) {
          newTodo.id = crypto.randomUUID()
          newTodo.dragId = crypto.randomUUID()
        }

        // console.log(newTodo, action.payload)

        // add new todo
        state.data = [...state.data, newTodo]
      }
    )
    builder.addCase(addTodo.rejected, (state, action) => {
      state.addTodo.data = []
      state.addTodo.loading = false
      state.addTodo.error = action.error as Error
    })
  },
})

export const { updateTodoReduxData } = todoSlice.actions

export default todoSlice.reducer
