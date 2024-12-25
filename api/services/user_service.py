from database import get_session
from models.createUserModel import User


def create_user(name, age, hashed_password):
    session = get_session()
    new_user = User(name=name, age=age, password=hashed_password)
    session.add(new_user)
    session.commit()
    session.close()


def get_users():
    session = get_session()
    users = session.query(User).all()
    session.close()
    return users


def get_user_by_name(user_name: str):
    session = get_session()
    return session.query(User).filter(User.name == user_name).first()
