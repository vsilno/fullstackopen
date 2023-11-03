/* eslint-disable react/prop-types */
import { useQuery } from "@apollo/client"
import { ALL_BOOKS, CURRENT_USER } from "../queries"

const Recommended = () => {
    const user = useQuery(CURRENT_USER)
    const books =  useQuery(ALL_BOOKS, {
        variables: { genre: user.data.me.favoriteGenre }
    })

    if (user.loading || books.loading) return <div>Loading...</div>
 
    return (
      <div>
        <h2>recommendations</h2>
        
        <p>books in your favorite genre <b>{user.data.me.favoriteGenre}</b></p>
        
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
      </div>
    )
  }
  
  export default Recommended