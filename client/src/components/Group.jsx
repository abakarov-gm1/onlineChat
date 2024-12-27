import React, { useState, useEffect, useRef } from 'react';
import useAuth from "../hooks/authHook";

const Home = () => {
  const [message, setMessage] = useState("");  // Состояние для ввода сообщения
  const [messages, setMessages] = useState([]);  // Состояние для всех сообщений
  const socketRef = useRef(null);
  const token = localStorage.getItem("token");
  const iUser = useAuth(); // Пример объекта пользователя

  const iUserRef = useRef(iUser);

  // Обновляем ссылку на текущего пользователя
  useEffect(() => {
    iUserRef.current = iUser;
  }, [iUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://api.abakarov.store/messages');
      const data = await response.json();
      setMessages(data);
    };

    fetchMessages();

    socketRef.current = new WebSocket(`ws://api.abakarov/ws?token=${token}&id_=${2}`);

    socketRef.current.onmessage = (event) => {
        try {
          // Парсим JSON из WebSocket-сообщения
          const parsedMessage = JSON.parse(event.data);

          // Добавляем новое сообщение в список
          const newMessage = {
            sender: { name: parsedMessage.sender || "Unknown" },
            message: parsedMessage.message || "",
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } catch (error) {
          console.error("Ошибка обработки сообщения:", error);
        }
      };

    socketRef.current.onopen = () => console.log("WebSocket подключен");

    socketRef.current.onclose = () => console.log("WebSocket отключен");

    socketRef.current.onerror = (error) => console.error("WebSocket ошибка:", error);

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      setMessage(""); // Очистить поле ввода после отправки
    } else {
      console.log("WebSocket не открыт или уже закрыт. Попробуйте переподключиться.");
    }
  };

  const reset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Верхняя панель */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h3 className="text-lg font-bold">Профиль: {iUser?.sub}</h3>
        <button
          onClick={reset}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
          Выйти
        </button>
      </div>

      {/* Панель сообщений */}
      <div className="flex-1 flex flex-col p-4 bg-gray-100">
        <h2 className="text-lg font-bold mb-4 text-center">Группа Y342</h2>
        <div className="flex-1 border border-gray-300 p-4 mb-4 overflow-y-auto bg-white shadow-lg rounded-lg">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender.name === iUser?.sub ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg shadow-md ${
                  msg.sender.name === iUser?.sub
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm font-bold mb-1">{msg.sender.name}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ввод сообщения */}
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
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
