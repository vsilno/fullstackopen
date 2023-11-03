import { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { CURRENT_USER, BOOK_ADDED, ALL_BOOKS, GENRES } from './queries'
import NewBook from './components/NewBook'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/LoginForm'
import Recommended from './components/Recommended'

function App() {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)
  const user = useQuery(CURRENT_USER)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert('A new book has been added', data.data.bookAdded.title)
      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: '' } }, ({allBooks}) => {
        return {
          allBooks: allBooks.concat(data.data.bookAdded)
        }
      })
      client.refetchQueries({ include: [GENRES] })
    }
  })
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    if (user.data) {
      setToken(user.data.me)
    }
  }, [user])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {token ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>

      {error && <div style={{color: 'red', marginBlock: '10px'}}>{error}</div>}

      <Authors show={page === 'authors'} setError={setError} user={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={setError} />
      <Login show={page === 'login'} setError={setError} setToken={setToken} setPage={setPage} />
      {page === 'recommended' && <Recommended />}
    </div>
  )
}

export default App
