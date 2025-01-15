import { Button, Form, Input, Radio, Tooltip } from 'antd';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export type FormValues = {
  password: string;
  age: number;
  email: string;
  gender: string;
  username: string;
};
export const RegistrationForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const handleClickEnter = () => {
    navigate('/');
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (value: FormValues) => {
    try {
      await axios.post(`${apiUrl}/api/users/register`, value);
      alert('Регистрация прошла успешно');
      navigate('/');
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Имя пользователя:"
        className="custom-label"
        validateStatus={errors.username ? 'error' : ''}
        help={errors.username?.message}>
        <Controller
          name="username"
          control={control}
          rules={{ required: { value: true, message: 'Введите имя пользователя' } }}
          render={({ field }) => <Input {...field} placeholder="nikiN" />}
        />
      </Form.Item>
      <Form.Item
        label="Email:"
        className="custom-label"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: { value: true, message: 'Введите email' },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
              message: 'Введите корректный email',
            },
          }}
          render={({ field }) => <Input {...field} placeholder="nikita@yandex.ru" />}
        />
      </Form.Item>
      <Form.Item
        label="Пароль:"
        className="custom-label"
        help={errors.password?.message}
        validateStatus={errors.password ? 'error' : ''}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: 'Введите пароль' },
            pattern: { value: /^(?=.*[A-Z]).{8,}$/, message: 'Пароль не соответствует подсказке' },
          }}
          render={({ field }) => (
            <Tooltip title="Минимум 8 символов и 1 заглавную букву,1 прописную, 1 символ, 1 цифру">
              <Input.Password {...field} placeholder="Q123445566" />
            </Tooltip>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Пол:"
        className="custom-label"
        validateStatus={errors.gender ? 'error' : ''}
        help={errors.gender?.message}>
        <Controller
          name="gender"
          control={control}
          rules={{ required: { value: true, message: 'Выберите пол' } }}
          render={({ field }) => (
            <Radio.Group {...field} className="radio">
              <Radio value="male" className="radio__item">
                Мужской
              </Radio>
              <Radio value="female" className="radio__item">
                Женский
              </Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Возраст"
        className="custom-label"
        validateStatus={errors.age ? 'error' : ''}
        help={errors.age?.message}>
        <Controller
          name="age"
          control={control}
          rules={{
            required: { value: true, message: 'Введите возраст' },
            pattern: { value: /^[0-9]+$/, message: 'Возраст должен быть числом' },
            min: { value: 14, message: 'Возраст должен быть не менее 14 лет' },
            max: { value: 100, message: 'Возраст должен быть не более 100 лет' },
          }}
          render={({ field }) => <Input {...field} placeholder="18" />}
        />
      </Form.Item>
      <Form.Item>
        <div className="buttons">
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
          <p style={{ color: 'white', fontWeight: 500 }}>
            Уже имеешь аккаунт? <a onClick={handleClickEnter}>Войти!</a>
          </p>
        </div>
      </Form.Item>
    </Form>
  );
};
