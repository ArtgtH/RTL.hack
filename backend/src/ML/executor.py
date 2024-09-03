import asyncio
import random

from src.DB.models import Task, Status
from src.DB.commands import AsyncORM


class TaskExecutor:
    def __init__(self, task: Task):
        self.task = task

    async def execute(self):
        await self._do_something()
        await AsyncORM().update_task(self.task.id, self.task.status, self.task.result)

    async def _do_something(self):
        await asyncio.sleep(10)
        result = random.choice([Status.COMPLETED, Status.FAILED])
        self.task.status = result
        if result == "failed":
            self.task.result = "Error: Task failed due to some error"
        else:
            self.task.result = "123342"
