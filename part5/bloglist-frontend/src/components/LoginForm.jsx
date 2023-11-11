import { useState, useEffect } from 'react'
import { login } from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({setUser, setAlert, alert}) => {
	const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

	const handleLogin = async (e) => {
    e.preventDefault()
		try {
			const user = await login({ username, password })
			window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
			setUser(user)
			blogService.setToken(user.token)
		} catch (err) {
			setAlert({
				message: err.response.data.error,
				type: 'error'
			})
			setTimeout(() => {
				setAlert(null)
			}, 5000)
		}
  }
	
	return (
		<form onSubmit={handleLogin}>
			<h2>Login</h2>
			<div>
				<label htmlFor='username'>username</label>
				<input 
					id='username' 
					type='username' 
					value={username} 
					onChange={({target}) => setUsername(target.value)} 
				/>
			</div>
			<div>
				<label htmlFor='password'>password</label>
				<input 
					id='password' 
					type='password' 
					value={password} 
					onChange={({target}) => setPassword(target.value)} 
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	)
}

export default LoginForm