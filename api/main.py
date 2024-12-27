import json
import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends

from services.message_service import create_message_service, get_messages, get_expanded
from models.createUserModel import User
from routes.auth import router as auth, get_user_from_token
from services.user_service import create_user, get_users
from fastapi.middleware.cors import CORSMiddleware


# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://client.abakarov/*",
    "http://client.abakarov",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Разрешаем запросы с этих доменов
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP-методы
    allow_headers=["*"],  # Разрешаем все заголовки
)


# Список активных подключений
active_connections = []
user_connection = {}

app.include_router(auth, prefix="/auth", tags=["auth"])


@app.get("/users")
def users():
    return get_users()


@app.get("/messages")
def get_mess():
    return get_expanded()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str):

    user = get_user_from_token(token)
    await websocket.accept()
    active_connections.append(websocket)  # Добавляем объект WebSocket
    user_connection[user.id] = websocket

    try:
        while True:
            message = await websocket.receive_text()

            create_message_service(user.id, 1, message)

            message_data = {
                "sender": user.name,  # Имя пользователя
                "message": message,
            }
            message_json = json.dumps(message_data)

            for connection in active_connections:
                await connection.send_text(message_json)

            # for k, v in user_connection.items():
            #     if id_ != k:
            #         await v.send_text(f"{message}")
            #         logger.info(f"{user.id}|--|{id_}|--|{message}")
            #         create_message_service(user.id, id_, message=message)

    except WebSocketDisconnect:
        active_connections.remove(websocket)
        logger.warning(f"Client {websocket.client.host} disconnected")
        logger.info(f"Active connections: {[conn.client.host for conn in active_connections]}")




