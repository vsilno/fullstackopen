/* eslint-disable react/prop-types */
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useMutation } from "@apollo/client"

const Authors = (props) => {
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const authors = useQuery(ALL_AUTHORS)
    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [ { query: ALL_AUTHORS } ],
      onError: (error) => {
        const messages = error.graphQLErrors.map(e => e.message).join('\n')
        props.setError(messages)
      }
    })
  
    if (!props.show) {
      return null
    }

    if (authors.loading) return <div>Loading...</div>
 
    const handleSubmit = (e) => {
      e.preventDefault()
      editAuthor({ variables: { name, year }})
      setName('')
      setYear('')
    }

    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          props.user &&
          <>
            <h2>Set birthyear</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name'>name</label>
                <select id='name' value={name} onChange={({target}) => setName(target.value)}>
                  <option value=''>Select an author</option>
                  {
                    authors.data.allAuthors.map(a => (<option key={a.name} value={a.name}>{a.name}</option>))
                  }
                </select>
              </div>
              <div>
                <label htmlFor='year'>born</label>
                <input type='number' id='year' name='year' value={year} onChange={({target}) => setYear(Number(target.value))}></input>
              </div>
              <button type='submit'>update author</button>
            </form>
          </>
        }
      </div>
    )
  }
  
  export default Authors