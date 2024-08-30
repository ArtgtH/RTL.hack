import enum
from datetime import datetime
from typing import Annotated, List

from sqlalchemy import DateTime, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.DB.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    tasks: Mapped[List["Task"]] = relationship("Task", back_populates="user")

    repr_cols = (id, username)


class Status(enum.Enum):
    PENDING = "pending"
    COMPLETED = "finished"
    FAILED = "failed"


TypeStatus = Annotated[Status, mapped_column(Enum(Status))]


class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    status: Mapped[TypeStatus] = mapped_column(default=Status.PENDING)
    input_data: Mapped[str] = mapped_column(nullable=False)
    result: Mapped[str] = mapped_column(default=None, nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped[User] = relationship("User", back_populates="tasks")
