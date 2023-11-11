import axios from 'axios'
const baseUrl = '/api/blogs/'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}${blog.id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}${blog.id}`, config)
  return response.data
}

export default { 
  getAll, 
  setToken, 
  createBlog,
  like,
  deleteBlog
}