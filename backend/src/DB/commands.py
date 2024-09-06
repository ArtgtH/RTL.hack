from sqlalchemy import select
from src.DB.database import Base, async_engine, async_session_factory

from src.DB.models import User, Task


class AsyncORM:
    @staticmethod
    async def recreate_tables():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.drop_all)
            await conn.run_sync(Base.metadata.create_all)

    @staticmethod
    async def create_tables():
        async with async_engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

    @staticmethod
    async def insert_user(username: str, password: str):
        async with async_session_factory() as session:
            new_user = User(username=username, password=password)
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            return new_user

    @staticmethod
    async def check_user(username: str, password: str):
        async with async_session_factory() as session:
            query = select(User).where(User.username == username)
            result = await session.execute(query)
            user = result.scalar_one_or_none()
            if not user or user.password != password:
                return None
            return user

    @staticmethod
    async def insert_task(input_data: str, user_id: int):
        async with async_session_factory() as session:
            new_task = Task(input_data=input_data, user_id=user_id)
            session.add(new_task)
            await session.commit()
            await session.refresh(new_task)
            return new_task

    @staticmethod
    async def get_tasks(user_id: int):
        async with async_session_factory() as session:
            query = select(Task).filter(Task.user_id == user_id)
            result = await session.execute(query)
            tasks = result.scalars().all()
            return tasks

    @staticmethod
    async def get_one_task(task_id: int):
        async with async_session_factory() as session:
            query = select(Task).filter_by(id=task_id)
            result = await session.execute(query)
            task = result.scalar_one_or_none()
            return task

    @staticmethod
    async def update_task(idx: int, status: str, res: str):
        async with async_session_factory() as session:
            query = select(Task).filter(Task.id == idx)
            result = await session.execute(query)
            task = result.scalar_one_or_none()
            task.status = status
            task.result = res
            await session.commit()
