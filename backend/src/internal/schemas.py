from datetime import datetime
from typing import Optional, List, Dict, Any

from pydantic import BaseModel, ConfigDict
from src.DB.models import Status


class TaskCreationResult(BaseModel):
	result: bool


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
	pn_lot: str


class TaskCreate(TaskBase):
	user_id: int


class PurchaseTask(BaseModel):
	suppliers: List[List[Any]]


class TaskResult(TaskBase):
	id: int
	created_at: datetime
	result: List[PurchaseTask]
	status: Status

	class Config:
		orm_mode = True


User.update_forward_refs()
