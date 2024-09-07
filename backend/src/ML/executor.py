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
		return self.task

	async def _do_something(self):
		await asyncio.sleep(10)
		status = random.choice([Status.COMPLETED, Status.FAILED])
		self.task.status = status
		var = [
			["Заказчик_21466", "wow"],
			["Заказчик_21466", "not wow"],
			["Заказчик_21466", "bad"],
		]
		self.task.result = [
			{
				"purchase_name": "aboba",
				"customers": var,
			}
		]
