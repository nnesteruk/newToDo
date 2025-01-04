import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './scss/App.scss';
import { TaskList } from './components/TaskList';
import { withLogger } from './components/HOC/withLogger';

function App() {
  const LogComponent = withLogger(TaskList);

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
      <LogComponent />
    </>
  );
}

export default App;
