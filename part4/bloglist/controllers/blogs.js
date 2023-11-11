const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)

	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)
	const user = req.user

	if (!blog) return res.status(204).end()

	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndDelete(id)
	} else {
		res.status(401).send({ error: 'Only blog owners can delete their blogs' }).end()
	}

	res.status(204).end()
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body
	const user = req.user

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user.id,
		url: body.url,
		likes: body.likes || 0
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)

	await user.save()

	const populatedBlog = await Blog.findById(savedBlog._id).populate('user')

	res.status(201).json(populatedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
	const {  id, likes } = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(id, { likes: likes + 1 }, { new: true, runValidators: true, context: 'query' })
	await updatedBlog.populate('user')
	res.status(200).json(updatedBlog)
})

module.exports = blogsRouter