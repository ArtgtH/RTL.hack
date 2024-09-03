from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict
from src.DB.models import Status


class UserBase(BaseModel):
    username: str
    password: str


class UserLogin(UserBase):
    pass


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class TaskBase(BaseModel):
    input_data: str
    user_id: int


class TaskCreate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    created_at: datetime
    result: Optional[str] = None
    status: Status
    user_id: int

    class Config:
        orm_mode = True


User.update_forward_refs()
