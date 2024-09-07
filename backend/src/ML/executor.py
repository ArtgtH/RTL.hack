import asyncio
import random
import polars as pl


from src.DB.models import Task, Status
from src.DB.commands import AsyncORM


class TaskExecutor:
	def __init__(self, task: Task):
		self.task = task

	async def execute(self):
		self.read_parquet()
		await AsyncORM().update_task(self.task.id, self.task.status, self.task.result)
		return self.task

	def read_parquet(self):
		df = pl.read_parquet("src/internal/predict.parquet")
		res = df.filter(pl.col("pn_lot") == self.task.pn_lot).to_dicts()

		mid_result = []
		for r in res:
			mid_result.append(
				[r.get("supplier"), r.get("proba")]
			)

		result = [
			{
				"suppliers": mid_result,
			}
		]
		self.task.result = result
		self.task.status = Status.COMPLETED

	async def _do_something(self):
		await asyncio.sleep(10)
		status = random.choice([Status.COMPLETED, Status.FAILED])
		self.task.status = status
		var = [
			["Поставщик_1", "wow"],
			["Поставщик_2", "not wow"],
			["Поставщик_3", "bad"],
		]
		self.task.result = [
			{
				"purchase_name": "aboba",
				"suppliers": var,
			}
		]

