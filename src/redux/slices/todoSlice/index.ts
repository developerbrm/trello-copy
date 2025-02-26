import { createSlice } from '@reduxjs/toolkit'
import { createInitialState } from '../../../utilities'
import { fetchAllTodos } from './thunks'
import { TodoState } from '../../../models/Todo.model'

const initialState: TodoState = createInitialState() as TodoState

initialState.data = []

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
})

export const {} = todoSlice.actions

export default todoSlice.reducer
