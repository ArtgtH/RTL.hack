from typing import List

from fastapi import status, APIRouter
from fastapi.responses import JSONResponse
from src.DB.commands import AsyncORM
from src.internal import schemas

router = APIRouter(prefix="/api", tags=["api"])


@router.on_event("startup")
async def startup():
    await AsyncORM.recreate_tables()


@router.post("/users/register", response_model=schemas.User)
async def create_user(user: schemas.UserCreate):
    new_user = await AsyncORM.insert_user(user.username, user.password)
    return new_user


@router.post("/users/login", response_model=schemas.User)
async def login(user: schemas.UserLogin):
    if result := await AsyncORM.check_user(user.username, user.password):
        return result
    return JSONResponse(content=str(result), status_code=status.HTTP_401_UNAUTHORIZED)


@router.post("/tasks", response_model=schemas.Task)
async def create_task(task: schemas.TaskCreate):
    new_task = await AsyncORM.insert_task(task.input_data, task.user_id)
    return new_task


@router.get("/tasks", response_model=List[schemas.Task])
async def get_tasks(user_id: int):
    tasks = await AsyncORM.get_tasks(user_id)
    return tasks


@router.get("/tasks/{task_id}", response_model=schemas.Task)
async def get_task(task_id: int):
    task = await AsyncORM.get_one_task(task_id)
    return task
