import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todoSlice';

const store = configureStore({
  reducer: {
    todo: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
