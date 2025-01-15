import React from 'react';

import { withLogger } from '../HOC/withLogger';
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useIsCompletedTodoMutation,
  useUpdateTodoMutation,
} from '../../redux/services/fetchTodoApi';
import { DeleteTask, IsCompletedTask, UpdateTask } from './TaskList.types';
import { Task } from './Task/Task';
import { TaskInput } from './Task/TaskInput';

export const TaskList: React.FC = () => {
  const { data: list, isLoading, error } = useGetTodosQuery();

  const [updateTodo, {}] = useUpdateTodoMutation();
  const [deleteTodo, {}] = useDeleteTodoMutation();
  const [isCompletedTodo, {}] = useIsCompletedTodoMutation();

  const TaskWithHOC = withLogger(Task);

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
  return (
    <div className="task-list">
      <h1>Get things done!</h1>
      <TaskInput />
      <div className="list">
        {list?.length ? (
          list.map((item) => (
            <TaskWithHOC
              item={item}
              key={item.id}
              deleteTask={deleteTask}
              updateTask={updateTask}
              isCompletedTask={isCompletedTask}
            />
          ))
        ) : isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : error ? (
          <h2>Произошла ошибка при загрузке</h2>
        ) : (
          <p>Список задач пуст</p>
        )}
      </div>
    </div>
  );
};
