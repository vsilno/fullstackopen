import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addBlog }) => {
	const [formData, setFormData] = useState({})
	const [visible, setVisible] = useState(false)

	const handleChange = ({target}) => {
		const key = target.id
		const value = target.value
		setFormData(prevForm => ({ ...prevForm, [key]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		addBlog({ ...formData })
	}

	const toggleVisible = () => {
		setVisible(prev => !prev)
	}

	if (!visible) return (<button onClick={toggleVisible}>new blog</button>)

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>
						title
					</label>
					<input id='title' type='text' value={formData.title || ''} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor='author'>
						author
					</label>
					<input id='author' type='text' value={formData.author || ''} onChange={handleChange} />
				</div>
				<div>
					<label htmlFor='url'>
						url
					</label>
					<input id='url' type='text' value={formData.url || ''} onChange={handleChange} />
				</div>
				<button type="submit">create</button>
				<button onClick={toggleVisible}>cancel</button>
			</form>
		</div>
	)
}

export default BlogForm