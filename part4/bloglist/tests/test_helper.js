const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'My first blog',
		author: 'Friedman',
		url: 'www.blog.com/1',
		likes: 0
	},
	{
		title: 'My second blog',
		author: 'Soros',
		url: 'www.blog.com/2',
		likes: 0
	},
]

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb
}