import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAddTask,
  fetchDeleteTask,
  fetchGetTodos,
  fetchIsCompletedTask,
  fetchUpdateTask,
} from '../reducers/todoThunkAction';
import { List, ListState } from './todoSlice.types';

const initialState: ListState = {
  list: [] as List[],
  isLoading: false,
  error: '',
};

export const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
        state.error = '';
      })
      .addCase(fetchGetTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      })
      .addCase(fetchAddTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list.push(action.payload);
        state.error = '';
      })
      .addCase(fetchAddTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      })
      .addCase(fetchUpdateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item,
        );
        state.error = '';
      })
      .addCase(fetchUpdateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      })
      .addCase(fetchDeleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.filter((item) => item.id !== action.payload.id);
        state.error = '';
      })
      .addCase(fetchDeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      })
      .addCase(fetchIsCompletedTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = state.list.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item,
        );
        state.error = '';
      })
      .addCase(fetchIsCompletedTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = `${action.payload}`;
      });
  },
});
export default todoSlice.reducer;
