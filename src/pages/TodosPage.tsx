import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { TaskList } from '../components/TaskList/TaskList';
import { useNavigate } from 'react-router';
export const TodosPage = () => {
  const navigate = useNavigate();
  const handleClickExit = () => {
    localStorage.removeItem('token');
    alert('Вы вышли из системы');
    navigate('/');
  };

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <TaskList />
      <a className="link__exit" onClick={handleClickExit}>
        Выйти
      </a>
    </div>
  );
};
