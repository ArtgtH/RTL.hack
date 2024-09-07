import React from 'react'
import logo from '../../assets/logo.png'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import logout from '../../assets/logout.svg'
function Header() {
	const user_id = localStorage.getItem('user_id')
	const navigate = useNavigate()
	const onLogout = () => {
		localStorage.clear()
		navigate('/sign-in')
	}
  return (
	<div className={styles.wrapper}>
		<Link to={user_id ? "/data" : "/sign-in"}>
			<img src={logo} alt="logo" style={{width: '200px'}}/>
		</Link>
		<img src={logout} alt="" className={styles.logout} onClick={onLogout}/>
	</div>
  )
}

export default Header
