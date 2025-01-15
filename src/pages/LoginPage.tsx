import { FC } from 'react';
import { LoginForm } from '../components/Authorization/LoginForm';

export const LoginPage: FC = () => {
  return (
    <div>
      <h1>Вход в систему</h1>
      <LoginForm />
    </div>
  );
};
