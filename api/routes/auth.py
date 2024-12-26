import os
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from passlib.context import CryptContext
from services.user_service import create_user, get_user_by_name
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from models.createUserModel import User

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 90


# Инициализируем CryptContext для работы с bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# Функция для декодирования JWT и получения данных пользователя
def get_user_from_token(token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    # Возвращаем пользователя из базы по имени
    user = get_user_by_name(username)
    if user is None:
        raise credentials_exception
    return user


class UserRegisterData(BaseModel):
    name: str
    age: int
    password: str


class UserLoginData(BaseModel):
    name: str
    password: str


# для создания JWT токена
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})  # Устанавливаем время истечения токена
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# для хеширования пароля
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


# для проверки пароля
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/register")
def register(user: UserRegisterData):
    hashed_password = hash_password(user.password)
    create_user(user.name, user.age, hashed_password)
    return {"status": "success"}


@router.post("/login")
def login(data: UserLoginData):
    user = get_user_by_name(data.name)
    if user is None:
        return {"message": "user not found"}

    if not verify_password(data.password, user.password):
        return {"message": "password not verify"}

    access_token = create_access_token(data={"sub": user.name})
    return {"token": access_token}

