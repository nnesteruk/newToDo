import { JSX, useState } from 'react';
import { DeleteTask, IsCompletedTask, UpdateTask } from './TaskList';
import { List } from '../redux/reducers/todoReducer';

type Props = {
  item: List;
  deleteTask: DeleteTask;
  updateTask: UpdateTask;
  isCompletedTask: IsCompletedTask;
};
export const Task = ({ item, deleteTask, updateTask, isCompletedTask }: Props): JSX.Element => {
  const { id, title, isCompleted } = item;
  const [changeTask, setChangeTask] = useState(false);
  const [changeText, setChangeText] = useState('');

  const changeButton = () => {
    setChangeTask(!changeTask);
    if (!changeTask) {
      setChangeText(title);
    }
  };

  const isCompletedStyle = isCompleted ? 'line-through' : 'none';

  return (
    <>
      {changeTask ? (
        <div className="list__item_change">
          <input
            value={changeText}
            onChange={(e) => setChangeText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateTask(id, changeText);
            }}
          />
          <button onClick={() => updateTask(id, changeText)}>Изменить</button>
        </div>
      ) : (
        <div className="list__item">
          <li
            style={{ textDecoration: isCompletedStyle, cursor: 'pointer' }}
            onClick={() => isCompletedTask(id)}>
            {title}
          </li>
          <div className="list__buttons">
            <button onClick={changeButton}>Изменить</button>
            <button onClick={() => deleteTask(id)}>Удалить</button>
          </div>
        </div>
      )}
    </>
  );
};
