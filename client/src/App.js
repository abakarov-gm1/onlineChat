import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const websocket = useRef(null);

  useEffect(() => {
    // Создаем WebSocket-соединение с сервером
    websocket.current = new WebSocket('ws://localhost:8081/ws');

    websocket.current.onopen = () => {
      setConnected(true);
      console.log('Connected to WebSocket');
    };

    websocket.current.onclose = () => {
      setConnected(false);
      console.log('Disconnected from WebSocket');
    };

    websocket.current.onmessage = (event) => {
      // При получении сообщения от сервера, добавляем его в список
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    return () => {
      // Закрытие соединения при размонтировании компонента
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (websocket.current && message.trim() !== '') {
      websocket.current.send(message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1>Online Chat</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={!connected}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} disabled={!connected}>
        Send
      </button>
      {!connected && <p>Connecting to server...</p>}
    </div>
  );
}
export default App;