import { createSlice } from '@reduxjs/toolkit'
import { createInitialState } from '../../../utilities'
import { fetchAllTodos, updateTodo } from './thunks'
import { TodoState } from '../../../models/Todo.model'

const initialState: TodoState = createInitialState() as TodoState

initialState.data = []
initialState.updateTodo = createInitialState()

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all todos
    builder.addCase(fetchAllTodos.pending, (state, action) => {
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
    builder.addCase(updateTodo.pending, (state, action) => {
      state.updateTodo.loading = true
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.updateTodo.loading = false
      state.updateTodo.data = action?.payload || []
    })
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.updateTodo.data = []
      state.updateTodo.loading = false
      state.updateTodo.error = action.error as Error
    })
  },
})

export const {} = todoSlice.actions

export default todoSlice.reducer
