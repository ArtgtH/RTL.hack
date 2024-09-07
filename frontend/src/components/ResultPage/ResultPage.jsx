import React from 'react'
import { useSelector } from 'react-redux';
import styles from './ResultPage.module.scss'
import Table from '../Table/Table';

function ResultPage() {
	const user = useSelector((state) => state.user.user);
  return (
	<div className={styles.page}>
	 <div className={styles.wrapper}>
	 	<div>
			<p className={styles.title}>Идентификатор: {user?.pn_lot}</p>
	  		<p className={styles.title}>Максимальное количество товаров: {user?.suppliers_number}</p>
		</div>
		<div className={styles.table}>
			<Table items={user?.result?.suppliers}/>
		</div>
	 </div>
	</div>
  )
}

export default ResultPage
