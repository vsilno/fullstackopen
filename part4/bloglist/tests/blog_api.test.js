const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const { initialBlogs, blogsInDb } = require('./test_helper')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
}, 10000)

describe('when some blogs exist', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(initialBlogs.length)
	})


	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map(r => r.title)
		expect(titles).toContain(
			'My first blog'
		)
	})
})

describe('when adding blogs', () => {
	let authToken

	beforeAll( async () => {
		const loginInfo = { username: process.env.USER, password: process.env.PASSWORD }
		const { body } = await api.post('/api/login').send(loginInfo)
		authToken = body.token
	})

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'My third blog',
			author: 'Joe Smith',
			url: 'www.blog.com/3',
			likes: 0
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogs = await blogsInDb()
		expect(blogs).toHaveLength(initialBlogs.length + 1)

		const titles = blogs.map(blog => blog.title)
		expect(titles).toContain(
			'My third blog'
		)
	})

	test('a blog without title is not added', async () => {
		const newBlog = {
			author: 'Big Joe',
			url: 'url',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(400)

		const blogs = await blogsInDb()

		expect(blogs).toHaveLength(initialBlogs.length)
	})

	test('blog without url is not added', async () => {
		const newBlog = {
			title: 'A big Joe post',
			author: 'Big Joe',
			likes: 1
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${authToken}`)
			.expect(400)

		const blogs = await blogsInDb()

		expect(blogs).toHaveLength(initialBlogs.length)
	})

	test('adding blog w/o likes defaults to 0', async () => {
		const newBlog = {
			title: 'new Blog Post',
			author: 'Big Joe',
			url: 'url',
		}

		const response = await api.post('/api/blogs')
			.send(newBlog)
			.set('Authorization', `Bearer ${authToken}`)

		expect(response.statusCode).toBe(201)
		expect(response.body.likes).toBe(0)
	})

	test('adding blog w/o an auth token fails with 401', async () => {
		const newBlog = {
			title: 'new Blog Post',
			author: 'Big Joe',
			url: 'url',
		}

		const response = await api.post('/api/blogs').send(newBlog)

		expect(response.statusCode).toBe(401)
	})
})

describe('viewing an specific blog', () => {
	test('blogs unique identifier property is named id', async () => {
		const blogs = await blogsInDb()
		expect(blogs[0].id).toBeDefined()
	})
})

describe('when deleting blogs', () => {
	test('a blog is deleted if id is valid', async () => {
		const blogs = await blogsInDb()
		const blog = blogs[0]

		const res = await api.delete(`/api/blogs/${blog.id}`)

		const afterBlogs = await blogsInDb()
		const ids = afterBlogs.map(r => r.id)

		expect(res.statusCode).toBe(204)
		expect(afterBlogs.length).toBe(initialBlogs.length - 1)
		expect(ids).not.toContain(blog.id)
	})
})

describe('updating a blog', () => {
	test('succeeds when adding a like', async () => {
		const blogs = await blogsInDb()
		const blogToLike = blogs[0]
		blogToLike.likes = blogToLike.likes + 1

		const res = await api.put(`/api/blogs/${blogToLike.id}`).send(blogToLike)

		const updatedBlogs = await blogsInDb()
		const updatedBlog = updatedBlogs[0]

		expect(res.statusCode).toBe(200)
		expect(res.body).toEqual(blogToLike)
		expect(updatedBlog).toEqual(blogToLike)
	})
})

afterAll(async () => {
	await Blog.deleteMany({})
	await mongoose.connection.close()
})











