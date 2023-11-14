import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../utils/requests'
import { setNotification } from '../utils/setNotification'
import { useNotificationDispatch } from '../utils/notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const { mutate } = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
      setNotification(`You created ${anecdote.content}`, dispatch)
    },
    onError: (err) => {
      const error = err.response.data.error
      setNotification(error, dispatch)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
