import logging
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from routes.auth import router as auth
from services.user_service import create_user, get_users

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Список активных подключений
active_connections = []

app.include_router(auth, prefix="/auth", tags=["auth"])


@app.get("/get-users")
def create():
    return get_users()


@app.get("/create-user")
def create():
    create_user("Gadjimurad", 23)
    return "Success"


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)  # Добавляем объект WebSocket
    logger.info(f"New connection: {websocket.client.host}")

    try:
        while True:
            # Ожидаем сообщения от клиента
            message = await websocket.receive_text()
            logger.info(f"Message from {websocket.client.host}: {message}")

            # Рассылаем сообщение всем остальным подключенным
            for connection in active_connections:
                await connection.send_text(f"Message from {websocket.client.host}: {message}")

    except WebSocketDisconnect:
        # Обрабатываем отключение клиента
        active_connections.remove(websocket)
        logger.warning(f"Client {websocket.client.host} disconnected")
        logger.info(f"Active connections: {[conn.client.host for conn in active_connections]}")




