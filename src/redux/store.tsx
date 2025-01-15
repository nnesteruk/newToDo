import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todoSlice';
import { fetchTodoApi } from './services/fetchTodoApi';

const store = configureStore({
  reducer: {
    todo: todosReducer,
    [fetchTodoApi.reducerPath]: fetchTodoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchTodoApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
