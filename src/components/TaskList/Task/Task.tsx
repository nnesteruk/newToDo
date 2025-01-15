import { JSX, useState } from 'react';

import { Props } from '../TaskList.types';
import { TaskEdit } from './TaskEdit';
import { TaskActions } from './TaskActions';

export const Task = ({ item, deleteTask, updateTask, isCompletedTask }: Props): JSX.Element => {
  const { id, title, isCompleted } = item;
  const [changeTask, setChangeTask] = useState(false);

  const onChange = () => setChangeTask(true);
  const onCancel = () => setChangeTask(false);

  const isCompletedStyle = isCompleted ? 'line-through' : 'none';

  return (
    <>
      {changeTask ? (
        <TaskEdit updateTask={updateTask} title={title} id={id} onCancel={onCancel} />
      ) : (
        <div className="list__item">
          <li
            style={{ textDecoration: isCompletedStyle, cursor: 'pointer' }}
            onClick={() => isCompletedTask(id)}>
            {title}
          </li>
          <TaskActions onChange={onChange} onDelete={() => deleteTask(id)} />
        </div>
      )}
    </>
  );
};
