// import React, { useState, useEffect, useRef } from 'react';
// import {useGetMessagesQuery, useGetUsersQuery} from "../services/api";
// // import useAuth from "../hooks/authHook";
//
// const Home = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const socketRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { data: users, error, isLoading } = useGetUsersQuery(undefined, undefined);
//   // const { data: ms} = useGetMessagesQuery({ token:token, receiver_id:selectedUser ? selectedUser.id:0})
//
//   // console.log(ms)
//   console.log(selectedUser)
//
//   useEffect(() => {
//     socketRef.current = new WebSocket(`ws://api.abakarov/ws?token=${token}`);
//
//     socketRef.current.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };
//
//     socketRef.current.onopen = () => {
//       console.log("WebSocket подключен");
//     };
//
//     socketRef.current.onclose = () => {
//       console.log("WebSocket отключен");
//     };
//
//     socketRef.current.onerror = (error) => {
//       console.error("WebSocket ошибка:", error);
//     };
//
//     return () => {
//       socketRef.current.close();
//     };
//   }, [selectedUser]);
//
//   const sendMessage = () => {
//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       socketRef.current.send(message);
//       setMessage("");
//     } else {
//       console.log("WebSocket не открыт или уже закрыт. Попробуйте переподключиться.");
//     }
//   };
//
//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//     setIsMenuOpen(false); // Закрыть меню на мобильных устройствах
//   };
//
//   return (
//     <div className="flex h-screen">
//       {/* Мобильное меню (отображается только на небольших экранах) */}
//       {isMenuOpen && (
//         <div className="absolute inset-0 bg-gray-100 z-10 md:hidden">
//           <div className="p-4">
//             <h2 className="text-lg font-bold mb-4">Пользователи</h2>
//             <ul>
//               {users?.map((user, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleUserSelect(user)}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                 >
//                   {user.name}
//                 </li>
//               ))}
//             </ul>
//             <button
//               className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Закрыть
//             </button>
//           </div>
//         </div>
//       )}
//
//       {/* Левая панель для пользователей (скрыта на мобильных устройствах) */}
//       <div className="hidden md:block w-1/4 border-r border-gray-300 p-4 bg-gray-100">
//         <h2 className="text-lg font-bold mb-4">Пользователи</h2>
//         <ul>
//           {users?.map((user, index) => (
//             <li
//               key={index}
//               onClick={() => handleUserSelect(user)}
//               className={`p-2 cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-300' : 'hover:bg-gray-200'}`}
//             >
//               {user.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//
//       {/* Правая панель с сообщениями */}
//       <div className="flex-1 flex flex-col p-4">
//         {/* Кнопка для открытия меню на мобильных устройствах */}
//         <button
//           className="md:hidden mb-4 bg-blue-500 text-white px-4 py-2 rounded-md"
//           onClick={() => setIsMenuOpen(true)}
//         >
//           Меню
//         </button>
//
//         <h2 className="text-lg font-bold mb-4">Сообщения с {selectedUser?.name || "выберите пользователя"}</h2>
//         <div className="flex-1 border border-gray-300 p-2 mb-4 overflow-y-auto">
//           {messages.map((msg, index) => (
//             <div key={index} className="p-2 border-b border-gray-200">
//               {msg}
//             </div>
//           ))}
//
//           {/*{ms?.map((msg, index) => (*/}
//           {/*  <div key={index} className="p-2 border-b border-gray-200">*/}
//           {/*    {msg.message}*/}
//           {/*  </div>*/}
//           {/*))}*/}
//
//
//         </div>
//
//         <div className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Введите сообщение"
//             className="flex-1 border border-gray-300 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={!selectedUser} // Отключить ввод, если пользователь не выбран
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
//             disabled={!selectedUser} // Отключить кнопку, если пользователь не выбран
//           >
//             Отправить
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default Home;
