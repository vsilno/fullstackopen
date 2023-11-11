import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll()
      .then((res) => setBlogs(res))
    }
  }, [user])

  const addLike = async (blog) => {
    const res = await blogService.like(blog)
    setBlogs(prev => prev.map(b => b.id === res.id ? res : b))
  }

  const addBlog = async (newBlog) => {
    try {
			const res = await blogService.createBlog(newBlog)
			setBlogs(prev => prev.concat(res))
			setAlert({
					message: `A new blog '${newBlog.title}' has been added successfully`,
					type: 'success'
			})
			setVisible(false)
			setTimeout(() => {
				setAlert(null)
			}, 5000)
		} catch (e) {
			console.log(e)
			setAlert({
				message: 'An error occurred',
				type: 'error'
			})
			setTimeout(() => {
				setAlert(null)
			}, 5000)
		}
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
 
  return (
    <div>
      <Notification message={alert} />
      {
        user ?
          <>
            <h2>Blogs app</h2>
            <div><span>logged in as {user.username}</span> — <button onClick={logout}>logout</button></div>
            <hr />
            <BlogForm addBlog={addBlog} />
            <hr />
            <div>
              <h2>List of blogs</h2>
              {sortedBlogs.map(blog =>
                <Blog key={blog.id} 
                      blog={blog} 
                      setBlogs={setBlogs} 
                      currentUser={user}
                      addLike={addLike}
                 />
              )}
            </div>
          </>
          :
          <LoginForm setUser={setUser} setAlert={setAlert} />
      }
    </div>
  )
}

export default App