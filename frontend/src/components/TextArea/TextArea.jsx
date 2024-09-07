import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import styles from '../TextInput/TextInput.module.scss'

function TextArea(props) {
	const {className, 
		onHandleChange,
		width,
		label,
		name,
		type = 'text'
	} = props
	const { register, formState} = useFormContext()
	const { errors } = formState
  return (
	<div className={styles.wrapper} style={{ width }}>
		<textarea
		  {...register(name, {
			required: 'Обязательное поле',
		  })}
		//   placeholder={label}
		//   key={name}
		//   id={name}
		//   className={`${styles.input} ${className}`}
		/>
		<ErrorMessage
		  errors={errors}
		  name={name}
		  render={({ message }) => (
			<p className={styles.error}>
			  {message}
			</p>
		  )}
		/>
	  </div>
  )
}

export default TextArea
