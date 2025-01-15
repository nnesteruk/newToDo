import './scss/App.scss';
import { Route, Routes } from 'react-router';
import { RegistrationForm } from './components/Authorization/RegistrationForm';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { TodosPage } from './pages/TodosPage';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route element={<PrivateRoute />}>
        <Route path="/todosPage" element={<TodosPage />} />
      </Route>
    </Routes>
  );
}

export default App;
