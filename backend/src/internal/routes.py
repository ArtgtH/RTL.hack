from typing import List

from fastapi import status, APIRouter, HTTPException, BackgroundTasks
from src.DB.commands import AsyncORM
from src.internal import schemas
from src.ML.executor import TaskExecutor


router = APIRouter(prefix="/api", tags=["api"])


@router.on_event("startup")
async def startup():
    await AsyncORM.create_tables()


@router.post("/users/register", response_model=schemas.User)
async def create_user(user: schemas.UserCreate):
    new_user = await AsyncORM.insert_user(user.username, user.password)
    return new_user


@router.post("/users/login", response_model=schemas.User)
async def login(user: schemas.UserLogin):
    if result := await AsyncORM.check_user(user.username, user.password):
        return result
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
    )


@router.post("/tasks", response_model=schemas.TaskResult)
async def create_task(task: schemas.TaskCreate):
    new_task = await AsyncORM.insert_task(task.pn_lot, task.suppliers_number, task.user_id)
    await TaskExecutor(new_task).execute()
    return schemas.TaskCreationResult(result=True)
