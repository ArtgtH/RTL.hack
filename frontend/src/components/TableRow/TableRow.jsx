import React from 'react'
import styles from './TableRow.module.scss'

function TableRow({item}) {
	// const customers = item?.customers?.map((customer, index) => <p className={styles.customer} key={index}>{customer[0]} {customer[1]}</p>)
	console.log(item);
  return (
	<div
        className={styles.row}
        style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
    >
        <div className={`${styles.cell} ${styles.vertical}`}>
			{item[0]}
        </div>
		<div className={`${styles.cell}`}>
			{item[1]}
        </div>
      </div>
  )
}

export default TableRow
