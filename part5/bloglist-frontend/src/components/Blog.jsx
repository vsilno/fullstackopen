import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, currentUser, addLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(prev => !prev)
  }

  const deleteBlog = async () => {
    const proceed = window.confirm(`This operation will delete ${blog.title}, do you want to continue?`)
    if (proceed) {
      try {
        const res = await blogService.deleteBlog(blog)
         setBlogs(prev => prev.filter(b => b.id !== blog.id))
      } catch (err) {
        console.log(err)
      }
    }
  }
 
  return (
    <div className='blog' style={{ border: '1px solid black', padding: '1em' }}>
      <span>{blog.title}</span> — <span>{blog.author}</span> — <button className='show' onClick={toggleVisible}>{visible ? 'hide' : 'view'}</button>
      {
        visible &&
        <>
          <p className='url'>{blog.url}</p>
          <p className='likes'>likes {blog.likes} <button className='like' onClick={() => addLike(blog)}>like</button></p>
          <p>{blog.user ? blog.user.name : 'user not found'}</p>
          {
            currentUser.username === blog.user.username && 
            <button onClick={deleteBlog}>delete</button>
          }
        </>
      }
    </div>  
  )
}

export default Blog