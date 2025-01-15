import { FC, useState } from 'react';
import { TaskEditProps } from '../TaskList.types';

export const TaskEdit: FC<TaskEditProps> = ({ updateTask, title, id, onCancel }) => {
  const [changeText, setChangeText] = useState(title);

  return (
    <div className="list__item-change">
      <input
        value={changeText}
        onChange={(e) => setChangeText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') updateTask(id, changeText);
        }}
      />
      <div className="list__buttons">
        <button onClick={() => updateTask(id, changeText)}>Изменить</button>
        <button onClick={() => onCancel()}>Отмена</button>
      </div>
    </div>
  );
};
