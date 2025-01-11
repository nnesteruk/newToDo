import React, { useState, ChangeEvent, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Task } from './Task';
import { withLogger } from './HOC/withLogger';
import axios from 'axios';
import { useNavigate } from 'react-router';

export type ItemList = {
  id: number;
  title: string;
  isCompleted: boolean;
  user_id?: number;
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
  const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
  const baseUrl = 'https://todo-redev.herokuapp.com';
  const navigate = useNavigate();

  const [list, setList] = useState<List>([]);
  const [newTask, setNewTask] = useState('');
  const [trigger, setTrigger] = useState(0);

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/todos`, config);
      setList([...data]);
    } catch (err) {
      console.error(err);
    }
  };

  const TaskWithHOC = withLogger(Task);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  const addTask = async (): Promise<void> => {
    if (newTask.trim() === '') {
      alert('Введите название задачи!');
      return;
    }
    try {
      await axios.post(`${baseUrl}/api/todos`, { title: newTask }, config);
      setNewTask('');
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask: DeleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/api/todos/${id}`, config);
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask: UpdateTask = async (id, title, setChangeTask) => {
    if (title === '') {
      alert('Пожалуйста введите текст задачи!');
      return;
    }
    try {
      await axios.patch(`${baseUrl}/api/todos/${id}`, { title: title }, config);
      setChangeTask(false);
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };
  const isCompletedTask: IsCompletedTask = async (id) => {
    try {
      await axios.patch(`${baseUrl}/api/todos/${id}/isCompleted`, undefined, config);
      setTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, [trigger]);

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
        <a className="link__exit" onClick={handleClickExit}>
          Выйти
        </a>
      </div>
    </>
  );
};
