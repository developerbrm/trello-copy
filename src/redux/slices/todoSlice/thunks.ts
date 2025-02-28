import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TodoItem } from '../../../models/Todo.model'
import { toast } from 'react-toastify'
import { convertTodoItem } from '../../../utilities'

const TODOS_API_ENDPOINT = `https://dummyjson.com/todos`

export const fetchAllTodos = createAsyncThunk('todos/fetchAllTodos', async () =>
  axios
    .get(TODOS_API_ENDPOINT)
    .then((res) =>
      (res.data.todos as TodoItem[]).map((todo) => convertTodoItem(todo, false))
    )
    .catch((err) => {
      console.log(err)
      return Promise.reject(Error(err))
    })
)

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({
    todo,
    callback,
    updateRedux = true,
  }: {
    todo: TodoItem
    callback?: () => void
    updateRedux?: boolean
  }) =>
    axios
      .put(`${TODOS_API_ENDPOINT}/${todo.id}`, convertTodoItem(todo, true))
      .then((res) => {
        callback?.()

        toast.success(`Todo updated successfully`)
        return { data: res.data, updateRedux }
      })
      .catch((err) => {
        console.log(err)

        toast.error(err.data?.message ?? 'Something went wrong')
        return Promise.reject(Error(err))
      })
)

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async ({
    todo,
    callback,
    updateRedux = true,
  }: {
    todo: TodoItem
    callback?: () => void
    updateRedux?: boolean
  }) =>
    axios
      .post(`${TODOS_API_ENDPOINT}/add`, convertTodoItem(todo, true))
      .then((res) => {
        callback?.()

        toast.success('Todo created successfully')
        return { data: res.data, updateRedux }
      })
      .catch((err) => {
        console.log(err)

        toast.error(err?.message ?? 'Something went wrong')
        return Promise.reject(Error(err))
      })
)
