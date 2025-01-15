import { FC } from 'react';
import { TaskActionsProps } from '../TaskList.types';

export const TaskActions: FC<TaskActionsProps> = ({ onChange, onDelete }) => {
  return (
    <div className="list__buttons">
      <button onClick={onChange}>Изменить</button>
      <button onClick={onDelete}>Удалить</button>
    </div>
  );
};
