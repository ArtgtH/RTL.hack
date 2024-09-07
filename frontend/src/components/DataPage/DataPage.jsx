import styles from './DataPage.module.scss'
import { FormProvider, useForm } from "react-hook-form";
import TextInput from '../TextInput/TextInput';
import { _apiUrl } from '..';
import { useNavigate } from 'react-router-dom';
import TextArea from '../TextArea/TextArea';

function DataPage() {
	const methods = useForm()
	const {handleSubmit, setError} = methods
	const navigate = useNavigate()

	const onSubmit = async (data) => {

	}
  return (
	<div className={styles.page}>
		<div className={styles.wrapper}>
			<p className={styles.title}>Введите данные</p>
			<FormProvider {...methods}>
				<form
				 id="data"
				 className={styles.inputs}
				 onSubmit={handleSubmit(onSubmit)}
				>
					<TextArea/>
					{/* <textarea/> */}
				</form>
			</FormProvider>
			<button form="data" className={styles.btn} type="submit">
                Отправить
            </button>
		</div>
	</div>
  )
}

export default DataPage
