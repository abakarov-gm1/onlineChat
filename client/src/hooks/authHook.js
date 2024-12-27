import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Получаем токен из localStorage (или другого хранилища)
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Декодируем токен и извлекаем информацию о пользователе
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Ошибка при декодировании токена", error);
        setUser(null); // Если токен невалиден, сбрасываем пользователя
      }
    } else {
      setUser(null); // Если токен отсутствует
    }
  }, []); // Хук сработает один раз при монтировании компонента

  return user;
};

export default useAuth;