import styles from './SignUpPage.module.scss'
import { FormProvider, useForm } from "react-hook-form";
import TextInput from '../TextInput/TextInput';
import { _apiUrl } from '..';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
	const methods = useForm()
	const {handleSubmit, setError} = methods
	const navigate = useNavigate()

	const onSubmit = async (data) => {
		if (data.password1 !== data.password2) {
			setError('password2', {type: 'custom', message: 'Пароли не совпадают'})
		} else{
			await fetch(`${_apiUrl}/api/users/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: data.login,
					password: data.password1
				})
			}).then(res => {
				if (res.status === 200) {
					navigate('/data')
				}
			})
		}
	}

  return (
	<div className={styles.page}>
		<div className={styles.wrapper}>
			<p className={styles.title}>Регистрация</p>
			<FormProvider {...methods}>
				<form
				 id="registration"
				 className={styles.inputs}
				 onSubmit={handleSubmit(onSubmit)}
				>
					<TextInput name="login" width="400px" label="Логин" />
                    <TextInput
                        name="password1"
                        width="400px"
                        label="Пароль"
                        type="password"
                    />
                    <TextInput
                        name="password2"
                        width="400px"
                        label="Пароль"
                        type="password"
                    />
				</form>
			</FormProvider>
			<button form="registration" className={styles.btn} type="submit">
                Зарегистрироваться
            </button>
		</div>
	</div>
  )
}

export default SignUpPage
