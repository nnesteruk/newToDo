import './scss/App.scss';
import { TaskList } from './components/TaskList';
import { LoginForm } from './components/Authorization/LoginForm';
import { Route, Routes } from 'react-router';
import { RegistrationForm } from './components/Authorization/RegistrationForm';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route element={<PrivateRoute />}>
        <Route path="/task-list" element={<TaskList />} />
      </Route>
    </Routes>
  );
}

export default App;
