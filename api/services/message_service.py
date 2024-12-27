from database import get_session
from models.MessageModel import Message
from sqlalchemy.orm import joinedload


def create_message_service(sender_idm, receiver_id, message):
    session = get_session()
    message = Message(sender_id=sender_idm, receiver_id=receiver_id, message=message)
    session.add(message)
    session.commit()
    session.close()


def get_messages():
    session = get_session()
    return session.query(Message).all()


def get_expanded():
    session = get_session()
    return session.query(Message).options(
        joinedload(Message.sender),  # Подгружаем данные отправителя
        joinedload(Message.receiver)  # Подгружаем данные получателя
    ).all()

