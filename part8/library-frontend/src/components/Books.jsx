/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GENRES } from "../queries"
import { useState } from 'react'

const Books = (props) => {
    const [genre, setGenre] = useState('')
    const books = useQuery(ALL_BOOKS, {
      variables: { genre }
    })
    const genres = useQuery(GENRES)
   
    if (!props.show) {
      return null
    }
    
    if (books.loading || genres.loading) return <div>Loading...</div>
  
    const uniqueGenres = new Set(genres.data.allBooks.flatMap(book => book.genres))
    const allGenres = Array.from(uniqueGenres)
  
    return (
      <div>
        <h2>books</h2>
        {
          genre && <p>in genre: <b>{genre}</b></p>
        }
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {
            allGenres.map((genre) => (<button key={genre} onClick={() => setGenre(genre)}>{genre}</button>))
          }
          <button onClick={() => setGenre('')}>all genres</button>
        </div>
      </div>
    )
  }
  
  export default Books