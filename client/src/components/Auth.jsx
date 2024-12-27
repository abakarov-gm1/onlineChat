import React, { useState } from 'react';
import { login, register } from "../services/Auth";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  function reset() {
    setIsLogin(!isLogin);
    setPassword('');
    setName('');
    setAge('');
  }

  function submit(e) {
    // Останавливаем перезагрузку страницы при сабмите формы
    e.preventDefault();
    if (isLogin) {
      // В случае входа, передаем name и password
      login(name, password);
    } else {
      // В случае регистрации, передаем name, age и password
      register(name, age, password);
    }
    reset()

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>

        <form onSubmit={submit}> {/* Добавляем onSubmit для формы */}
          {/* Имя */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя</label>
            <input
              id="email"
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Пароль */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Возраст (показываем только при регистрации) */}
          {isLogin ? null : (
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Возраст</label>
              <input
                id="age"
                className="w-full px-4 py-2 mt-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        {/* Ссылка на переключение между формами */}
        <div className="mt-4 text-center">
          <button
            onClick={() => reset()}
            className="text-sm text-blue-500 hover:underline"
          >
            {isLogin ? 'Регистрация' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
