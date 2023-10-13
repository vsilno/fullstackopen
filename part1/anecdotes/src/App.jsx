import { useState } from 'react'
import { anecdotes } from './anecdotes'

function App() {
  const randomInteger = Math.floor(Math.random() * anecdotes.length) 
  const votesObject = anecdotes.reduce((object, _, index) => ({...object, [index]: 0}), {})
  const [selected, setSelected] = useState(randomInteger)
  const [votes, setVotes] = useState(votesObject)
  const [mostVoted, setMostVoted] = useState(0) 

  const handleAnecdote = () => {
    let randomInteger
    do {
      randomInteger = Math.floor(Math.random() * anecdotes.length)
    } while (randomInteger === selected)
    setSelected(randomInteger)
  }

  const handleVote = (index) => {
    const newVote = votes[index] + 1
    setVotes(prevObj => ({...prevObj, [index]: newVote}))
    if (newVote > votes[mostVoted]) setMostVoted(index)
  }
  
  return (
    <>
      <main>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
        <Button onClick={() => handleVote(selected)} text='vote' />
        <Button onClick={handleAnecdote} text='next anecdote' />
        <MostVoted anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
      </main>
    </>
  )
}

const Anecdote = ({anecdote, votes}) => {
  
  return (
    <section>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} {`vote${votes > 1 ? 's' : ''}`}</p>
    </section>
  )
}

const MostVoted = ({anecdote, votes}) => {
  return (
    <section>
      <h2>
        Anecdote with most votes
      </h2>
      {votes 
        ?
        <>
          <p>{anecdote}</p>
          <p>has {votes} {`vote${votes > 1 ? 's' : ''}`}</p>
        </>
        :
        <p>No votes have been cast yet</p>
      }
      
    </section>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export default App
