import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../utils/anecdoteService'

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      state.find(a => a.id === id).votes++
      return state
    },
    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export default anecdoteSlice.reducer
export const { 
  vote, 
  addAnecdote,
  appendAnecdote,
  setAnecdote
} = anecdoteSlice.actions

export const initializeState = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.vote(anecdote)
    dispatch(vote(anecdote.id))
  }
}