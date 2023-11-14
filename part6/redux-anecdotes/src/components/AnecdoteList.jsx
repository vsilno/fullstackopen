import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createAlert } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
	const anecdotes = useSelector(({anecdotes, filter}) => {
		if (filter) {
			return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
		}
		return anecdotes
	})
	
  const dispatch = useDispatch()

	const handleClick = (anecdote) => {
		dispatch(addVote(anecdote))
		const message = `You voted for '${anecdote.content}'`
		dispatch(createAlert(message, 5))
	}

	const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
	
	return (
		<div>
			{
			sortedAnecdotes.map(anecdote =>
				<Anecdote 
					key={anecdote.id} 
					content={anecdote.content}
					votes={anecdote.votes}
					handleClick={() => handleClick(anecdote)}
				/>
			)
			}
		</div>
	)
}

export default AnecdoteList