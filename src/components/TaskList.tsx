import React, { useState, ChangeEvent } from 'react';
import { Task } from './Task';
import { withLogger } from './HOC/withLogger';

export type ItemList = {
  id: number;
  name: string;
  isCompleted: boolean;
};
type List = ItemList[];
export type UpdateTask = (
  id: number,
  newValue: string,
  setChangeTask: React.Dispatch<React.SetStateAction<boolean>>,
) => void;

export type DeleteTask = (id: number) => void;
export type IsCompletedTask = (id: number) => void;
export const TaskList: React.FC = () => {
  const [list, setList] = useState<List>([
    { id: 1, name: 'Сделать todo', isCompleted: false },
    { id: 2, name: 'покушать', isCompleted: false },
    { id: 3, name: 'сходить в зал', isCompleted: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const TaskWithHOC = withLogger(Task);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  const addTask = (): void => {
    if (newTask.trim() === '') {
      alert('Введите название задачи!');
      return;
    }
    setList((prev) => [...prev, { id: Date.now(), name: newTask, isCompleted: false }]);
    setNewTask('');
  };
  const deleteTask: DeleteTask = (id) => {
    setList((prev) => [...prev].filter((item) => item.id !== id));
  };

  const updateTask: UpdateTask = (id, newValue, setChangeTask) => {
    if (newValue === '') {
      alert('Пожалуйста введите текст задачи!');
      return;
    }
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, name: newValue } : item)));
    setChangeTask(false);
  };
  const isCompletedTask: IsCompletedTask = (id) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)),
    );
  };
  return (
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
      <div className="list">
        {list.length ? (
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
        ) : (
          <p>Add your first task!</p>
        )}
      </div>
    </div>
  );
};
