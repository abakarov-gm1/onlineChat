import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [message, setMessage] = useState("");  // Состояние для сообщений
  const [messages, setMessages] = useState([]);  // Состояние для всех сообщений
  const [users, setUsers] = useState(["User 1", "User 2", "User 3"]); // Пример списка пользователей
  const socketRef = useRef(null);
  const token = localStorage.getItem("token");
  const [selectedUser, setSelectedUser] = useState(null); // Состояние для выбранного пользователя

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://api.abakarov/ws?token=${token}&id_=${2}`);

    // Обработчик события при получении сообщения от сервера
    socketRef.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Обработчик при открытии соединения
    socketRef.current.onopen = () => {
      console.log("WebSocket подключен");
    };

    // Обработчик при закрытии соединения
    socketRef.current.onclose = () => {
      console.log("WebSocket отключен");
    };

    // Обработчик ошибок
    socketRef.current.onerror = (error) => {
      console.error("WebSocket ошибка:", error);
    };

    // Закрываем WebSocket-соединение при размонтировании компонента
    return () => {
      socketRef.current.close();
    };
  }, []);

  // Функция для отправки сообщения через WebSocket
  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      setMessage("");  // Очистить поле ввода после отправки
    } else {
      console.log("WebSocket не открыт или уже закрыт. Попробуйте переподключиться.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Левая панель со списком пользователей */}
      <div className="w-1/4 border-r border-gray-300 p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Пользователи</h2>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() => setSelectedUser(user)}
              className={`p-2 cursor-pointer ${selectedUser === user ? 'bg-blue-300' : 'hover:bg-gray-200'}`}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Правая панель с сообщениями */}
      <div className="w-3/4 flex flex-col p-4">
        <h2 className="text-lg font-bold mb-4">Сообщения</h2>
        <div className="flex-1 border border-gray-300 p-2 mb-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              {msg}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Введите сообщение"
            className="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
