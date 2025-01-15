import React, { useState, ChangeEvent, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Task } from './Task';
import { withLogger } from './HOC/withLogger';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  fetchAddTask,
  fetchDeleteTask,
  fetchGetTodos,
  fetchIsCompletedTask,
  fetchUpdateTask,
} from '../redux/reducers/todoThunkAction';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useIsCompletedTodoMutation,
  useUpdateTodoMutation,
} from '../redux/services/fetchTodoApi';

export type UpdateTask = (id: number, newValue: string) => void;
export type DeleteTask = (id: number) => void;
export type IsCompletedTask = (id: number) => void;
export const apiUrl = import.meta.env.VITE_API_URL;
export const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { list, error, isLoading } = useAppSelector((state) => state.todo);
  const { data: list, isLoading, error } = useGetTodosQuery();
  const [addTodo, {}] = useAddTodoMutation();
  const [updateTodo, {}] = useUpdateTodoMutation();
  const [deleteTodo, {}] = useDeleteTodoMutation();
  const [isCompletedTodo, {}] = useIsCompletedTodoMutation();

  const [newTask, setNewTask] = useState('');

  const TaskWithHOC = withLogger(Task);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  const addTask = async (): Promise<void> => {
    if (newTask.trim() === '') {
      alert('Введите название задачи!');
      return;
    }
    // dispatch(fetchAddTask(newTask));
    addTodo(newTask);
    setNewTask('');
  };
  const deleteTask: DeleteTask = async (id) => {
    // dispatch(fetchDeleteTask(id));
    deleteTodo(id);
  };

  const updateTask: UpdateTask = async (id, title) => {
    if (title === '') {
      alert('Пожалуйста введите текст задачи!');
      return;
    }
    // dispatch(fetchUpdateTask({ id, title }));
    updateTodo({ id, title });
  };

  const isCompletedTask: IsCompletedTask = async (id) => {
    // dispatch(fetchIsCompletedTask(id));
    isCompletedTodo(id);
  };

  // useEffect(() => {
  //   dispatch(fetchGetTodos());
  // }, [dispatch]);

  const handleClickExit = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="task-list">
        <h1>Get things done!</h1>
        <div className="block-input">
          <input
            placeholder="Какая задача на сегодня?"
            onChange={handleChange}
            value={newTask}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addTask();
            }}
            className="block-input__add"
          />
          <button onClick={addTask} className="button-add">
            Добавить
          </button>
        </div>
        {}
        <div className="list">
          {list?.length ? (
            list.map((item) => (
              <React.Fragment key={item.id}>
                <TaskWithHOC
                  item={item}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                  isCompletedTask={isCompletedTask}
                />
              </React.Fragment>
            ))
          ) : isLoading ? (
            <h2>Идет загрузка...</h2>
          ) : (
            <p>Add your first task!</p>
          )}
        </div>
        <a className="link__exit" onClick={handleClickExit}>
          Выйти
        </a>
      </div>
    </>
  );
};
