import styles from './Table.module.scss'
import { memo } from 'react'
import TableRow from '../TableRow/TableRow'

const Table = memo(({items}) => {
	const column_names = [
		{ value: 'Название поставщика'},
		{ value: 'Название товара', },
	]
	
	const columns = column_names.map((item, index) => <div key={index} className={styles.column}>{item.value}</div>)
	const rows = items?.map((item, index) => {
		return(
			<TableRow key={index} item={item}/>
		)
})
	return (
		<div className={styles.table} >
			<div className={styles.head} style={{ gridTemplateColumns: `repeat(2, 1fr)`}}>
				{columns}
			</div>
			<div className={styles.body}>
				{rows?.length > 0 ? rows: <p className={styles.not_found}>Ничего не найдено</p>}
			</div>	
		</div>
	)
})

export default Table