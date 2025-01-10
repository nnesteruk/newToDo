import { Button, Form, Input, Tooltip } from 'antd';
import React from 'react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type Defaults = {
  email?: string;
  password?: string;
};
export const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Defaults>();
  const navigate = useNavigate();
  const onSubmit = async (data: Defaults) => {
    try {
      const response = await axios.post(`https://todo-redev.herokuapp.com/api/auth/login`, data);
      console.log(response);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/task-list');
    } catch (err: any) {
      alert(err.message.data.message);
      console.log(err);
    }
  };
  const handleClickRegister = () => {
    navigate('/register');
  };

  return (
    <Form className="login-form" onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
        className="custom-label">
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'Введите email' },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Введите корректный email.',
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Email" />}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
        className="custom-label">
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: {
              value: /^(?=.*[A-Z]).{8,}$/,
              message: 'Пароль долежн содеражть минимум 8 символов',
            },
          }}
          render={({ field }) => (
            <Tooltip title="Пароль должен содержать минимум 8 символов и 1 заглавную букву">
              <Input.Password {...field} placeholder="Password" />
            </Tooltip>
          )}
        />
      </Form.Item>
      <Form.Item>
        <div className="buttons">
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
          <Button type="link" className="buttons__register" onClick={handleClickRegister}>
            Зарегистрироваться
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
