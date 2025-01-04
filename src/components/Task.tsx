import React, { useState } from 'react';

export const Task = ({ item, deleteTask, updateTask, isCompletedTask }) => {
  const { id, name, isCompleted } = item;
  const [changeTask, setChangeTask] = useState(false);
  const [changeText, setChangeText] = useState('');

  const changeButton = () => {
    setChangeTask(!changeTask);
    if (!changeTask) {
      setChangeText(name);
    }
  };

  const isCompletedStyle = isCompleted ? 'line-through' : 'none';

  return (
    <>
      {changeTask ? (
        <div className="list__item_change">
          <input value={changeText} onChange={(e) => setChangeText(e.target.value)} />
          <button onClick={() => updateTask(id, changeText, setChangeTask)}>Изменить</button>
        </div>
      ) : (
        <div className="list__item">
          <li
            style={{ textDecoration: isCompletedStyle, cursor: 'pointer' }}
            onClick={() => isCompletedTask(id)}>
            {name}
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
