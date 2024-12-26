from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, func
from sqlalchemy.orm import relationship
from database import Base


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    sender_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id", ondelete='CASCADE'), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())
    status = Column(String(20), default='sent')

    sender = relationship("User", foreign_keys=[sender_id], backref="sent_messages")
    receiver = relationship("User", foreign_keys=[receiver_id], backref="received_messages")


