import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Provider({children}) {
	useEffect(() => {
		if (user_id){
			navigate('/data')
		} else {
			navigate('/sign-in')
		}
	}, [])
	const user_id = localStorage.getItem('user_id')
	const navigate = useNavigate()
  return (
	<div>
	  {children}
	</div>
  )
}

export default Provider
