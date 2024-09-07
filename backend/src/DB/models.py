import enum
from datetime import datetime
from typing import Annotated, List, Any

from sqlalchemy import DateTime, Enum, ForeignKey, JSON
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
	pn_lot: Mapped[str] = mapped_column(type_=JSON, nullable=False)
	suppliers_number: Mapped[int] = mapped_column(nullable=False)
	result: Mapped[dict[str, Any]] = mapped_column(default=None, nullable=True)
	user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
	user: Mapped[User] = relationship("User", back_populates="tasks")


class Participant(Base):
	__tablename__ = "participants"

	id: Mapped[int] = mapped_column(primary_key=True)
	pn_lot: Mapped[str]
	supplier: Mapped[str]
	is_winner: Mapped[int]


class Item(Base):
	__tablename__ = "items"

	id: Mapped[int] = mapped_column(primary_key=True)
	pn_lot: Mapped[str]
	item_name: Mapped[str]
	okpd2_code: Mapped[str]


class Tender(Base):
	__tablename__ = "tenders"

	id: Mapped[int] = mapped_column(primary_key=True)
	fz: Mapped[str]
	pn_lot: Mapped[str]
	region_code: Mapped[int]
	etp: Mapped[str]
	min_published_date: Mapped[datetime] = mapped_column(DateTime)
	purchase_name: Mapped[str]
	forsmallbiz: Mapped[bool]
	lot_price: Mapped[float]
	customer: Mapped[str]
