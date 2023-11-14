import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

	const handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setMessage(`a new anecdote '${content}' created!`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }

	return (
		<div>
			<h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
		</div>
	)
}

export default AnecdoteForm