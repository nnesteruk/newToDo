import axios, { AxiosResponse } from 'axios';
import { createAppAsyncThunk } from '../../hooks/hooks';
import { List } from '../slices/todoSlice.types';

const apiUrl: string = import.meta.env.VITE_API_URL;
export const instance = axios.create({
  baseURL: apiUrl,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
export const todosApi = {
  getTodos() {
    return instance.get<List[]>('/api/todos');
  },
  postTodos(title: string) {
    return instance.post<List, AxiosResponse<List>>('/api/todos', { title });
  },
  updateTodos(id: number, title: string) {
    return instance.patch<List, AxiosResponse<List>>(`/api/todos/${id}`, { title });
  },
  deleteTodos(id: number) {
    return instance.delete<List, AxiosResponse<List>>(`/api/todos/${id}`);
  },
  isCompletedTodos(id: number) {
    return instance.patch<List, AxiosResponse<List[]>>(`/api/todos/${id}/isCompleted`);
  },
};

export const fetchGetTodos = createAppAsyncThunk<List[], void>(
  'todos/fetchGetTodos',
  async (_, thunkApi) => {
    try {
      const { data } = await todosApi.getTodos();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось загрузить список задач');
    }
  },
);

export const fetchAddTask = createAppAsyncThunk<List, string>(
  'todos/fetchAddTask',
  async (title, thunkApi) => {
    try {
      const { data } = await todosApi.postTodos(title);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось добавить задачу');
    }
  },
);

export const fetchUpdateTask = createAppAsyncThunk<List, { id: number; title: string }>(
  'todos/fetchUpdateTask',
  async (task, thunkApi) => {
    try {
      const { data } = await todosApi.updateTodos(task.id, task.title);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось изменить задачу');
    }
  },
);

export const fetchDeleteTask = createAppAsyncThunk<List, number>(
  'todos/fetchDeleteTask',
  async (id, thunkApi) => {
    try {
      const { data } = await todosApi.deleteTodos(id);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось удалить задачу');
    }
  },
);

export const fetchIsCompletedTask = createAppAsyncThunk<List, number>(
  'todos/fetchIsCompletedTask',
  async (id, thunkApi) => {
    try {
      const { data } = await todosApi.isCompletedTodos(id);
      return data[0];
    } catch (err) {
      return thunkApi.rejectWithValue('Не удалось завершить задачу');
    }
  },
);
