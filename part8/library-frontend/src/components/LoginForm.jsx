/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'

const Login = ({show, setError, setToken, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login, result ] = useMutation(LOGIN, {
        onError: (e) => {setError(e.graphQLErrors[0].message)}
    })

    const submit = (e) => {
        e.preventDefault()
        login({variables: { username, password }})
    }
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            setPage('authors')
          }
    }, [result.data])

    if (!show) return null
    return (
      <div>
        <form onSubmit={submit}>
            <div>
                <label htmlFor='username'>username</label>
                <input 
                    id='username' 
                    name="username" 
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <label htmlFor='password'>password</label>
                <input 
                    id='password' 
                    name="password" 
                    type="password" 
                    autoComplete='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  
  export default Login