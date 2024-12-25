from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# Создаем объект Engine
engine = create_engine("postgresql://app:secret@db/app", echo=True)

# Создаем базовый класс для моделей
Base = declarative_base()

# Создаем сессию
Session = sessionmaker(bind=engine)


def get_session():
    return Session()
