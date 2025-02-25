import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const TODOS_API_ENDPOINT = `https://dummyjson.com/todos`

export const fetchAllTodos = createAsyncThunk('todos/fetchAllTodos', async () =>
  axios
    .get(TODOS_API_ENDPOINT)
    .then((res) => res.data.todos)
    .catch((err) => console.log(err))
)
