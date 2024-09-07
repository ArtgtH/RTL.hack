import styles from './SignInPage.module.scss'
import Btn from '../Btn/Btn'
import { FormProvider, useForm } from 'react-hook-form'
import TextInput from '../TextInput/TextInput';
import { _apiUrl } from '..';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
	const methods = useForm()
	const {handleSubmit, setError} = methods
	const navigate = useNavigate()
	const onSubmit = async (data) => {
		fetch(`${_apiUrl}/api/users/login`, {
			method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: data.login,
					password: data.password
				})
		})
		.then(async res => {
			if (res.status === 401){
                setError('password', {type: 'custom', message: 'Вы не зарегистрированы'})
            } else if (res.status === 200){
				const data = await res.json();
				localStorage.setItem('user_id', data.id)
				navigate('/data')
            }
		})
	}
  return (
	<div className={styles.page}>
	  	<div className={styles.wrapper1}>
			<p className={styles.title}>Добро пожаловать!</p>
			<Btn type="tonal" width='239px' to={'/sign-up'}>Регистрация</Btn>
		</div>

		<div className={styles.wrapper2}>
            <p className={styles.title}>Вход в аккаунт</p>
            <FormProvider {...methods}>
                <form
                    id="login_form"
                    className={styles.inputs}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextInput name="login" width="400px" label="Логин" />
                    <TextInput
                        name="password"
                        width="400px"
                        label="Пароль"
                        type="password"
                    />
                </form>
            </FormProvider>
            <button form="login_form" className={styles.btn} type="submit">
                Войти
            </button>
        </div>
	</div>
  )
}

export default SignInPage
