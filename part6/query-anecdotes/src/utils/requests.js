import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
	const res = await axios.get(`${baseUrl}`)
	return res.data
}	

const createAnecdote = async (anecdote) => {
	const res = await axios.post(`${baseUrl}`, anecdote)
	return res.data
}

const updateAnecdote = async (anecdote) => {
	const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
	return res.data
}

export {
	getAnecdotes,
	createAnecdote,
	updateAnecdote
}