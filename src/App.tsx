import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './scss/App.scss';
import { TaskList } from './components/TaskList';

function App() {
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
      <TaskList />
    </>
  );
}

export default App;
