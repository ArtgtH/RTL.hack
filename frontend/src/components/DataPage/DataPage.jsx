import styles from './DataPage.module.scss'
import { FormProvider, useForm } from "react-hook-form";
import TextInput from '../TextInput/TextInput';
import { _apiUrl } from '..';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import { useState } from 'react';
import {  useDispatch} from 'react-redux'
import { setUserData } from '../../store';

function DataPage() {
	const methods = useForm()
	const {handleSubmit} = methods
	const navigate = useNavigate()
	const [isPending, setIsPending] = useState(false)
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		setIsPending(true)
		fetch(`${_apiUrl}/api/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				pn_lot: data?.pn_lot.toString(),
				suppliers_number: Number(data?.suppliers_number),
				user_id: Number(localStorage.getItem('user_id'))
			})
		})
		.then(async res => {
			const data = await res.json();
			dispatch(setUserData(data))
			setIsPending(false)
			navigate('/results')
		})
	}
  return (
	<div className={styles.page}>
		{isPending &&
		<div className={styles.loader}>
			<Oval
				ariaLabel="loading-indicator"
				strokeWidth={5}
				strokeWidthSecondary={5}
				color="#a9a9a9"
				secondaryColor="#959796"
			/>
		</div>
		}
		<div className={styles.wrapper}>
			<p className={styles.title}>Введите данные</p>
			<FormProvider {...methods}>
				<form
				 id="data"
				 className={styles.inputs}
				 onSubmit={handleSubmit(onSubmit)}
				>
					<TextInput name="pn_lot" width="400px" label="Идентификатор" />
					<TextInput name="suppliers_number" width="400px" label="Максимальное кол-во товаров" />
				</form>
			</FormProvider>
			<button form="data" className={styles.btn} type="submit">
                Получить поставщиков
            </button>
		</div>
	</div>
  )
}

export default DataPage
