import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { TodoItem } from './interface'

const TODOS_API_ENDPOINT = `https://dummyjson.com/todos`

export const fetchAllTodos = createAsyncThunk('todos/fetchAllTodos', async () =>
  axios
    .get(TODOS_API_ENDPOINT)
    .then((res) =>
      (res.data.todos as TodoItem[]).map((todo) => {
        const obj = { ...todo }

        obj.status = todo.completed ? 'completed' : 'pending'
        delete obj.completed

        return obj
      })
    )
    .catch((err) => console.log(err))
)
