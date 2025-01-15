import { ChangeEvent, FC, useState } from 'react';
import { useAddTodoMutation } from '../../redux/services/fetchTodoApi';

export const TaskInput: FC = () => {
  const [addTodo, {}] = useAddTodoMutation();
  const [newTask, setNewTask] = useState('');
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
  return (
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
  );
};
