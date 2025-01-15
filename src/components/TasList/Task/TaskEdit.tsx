import { FC, useState } from 'react';
import { UpdateTask } from '../TasList/TaskList.types';
type TaskEditProps = {
  updateTask: UpdateTask;
  title: string;
  id: number;
  onCancel: () => void;
};
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
