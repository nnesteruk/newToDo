import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { List } from '../slices/todoSlice.types';

const apiUrl: string = import.meta.env.VITE_API_URL;
export const fetchTodoApi = createApi({
  reducerPath: 'fetchTodoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<List[] | null, void>({
      query: () => ({
        url: '/api/todos',
      }),
      providesTags: (result) => (result ? ['Todos'] : []),
    }),
    addTodo: builder.mutation<List, string>({
      query: (title) => ({
        url: '/api/todos',
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<List, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `/api/todos/${id}`,
        method: 'PATCH',
        body: { title },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<List, number>({
      query: (id) => ({
        url: `/api/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
    isCompletedTodo: builder.mutation<List[], number>({
      query: (id) => ({
        url: `/api/todos/${id}/isCompleted`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useIsCompletedTodoMutation,
  useUpdateTodoMutation,
} = fetchTodoApi;
