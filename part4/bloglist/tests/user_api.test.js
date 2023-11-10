const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { usersInDb } = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
// const Blog = require('../models/blog')

beforeEach( async () => {
	await User.deleteMany({})
}, 10000)

describe('creating a new user', () => {
	test('without an username fails and returns an error message', async () => {
		const newUser = { name: 'joe', password: '123' }
		const res = await api.post('/api/users').send(newUser)
		const users = await usersInDb()

		expect(res.statusCode).toBe(400)
		expect(res.body.error).toMatch(/username.*required/i)
		expect(users.length).toBe(0)
	})

	test('without a password fails and returns an error message', async () => {
		const newUser = { name: 'joe', username: 'goodjoe' }
		const res = await api.post('/api/users').send(newUser)
		const users = await usersInDb()

		expect(res.statusCode).toBe(400)
		expect(res.body.error).toMatch(/password.*required/i)
		expect(users.length).toBe(0)
	})

	test('with a short username fails and returns an error message', async () => {
		const newUser = { username: 'me', name: 'joe', password: '123' }
		const res = await api.post('/api/users').send(newUser)
		const users = await usersInDb()

		expect(res.statusCode).toBe(400)
		expect(res.body.error).toMatch(/username.*length/i)
		expect(users.length).toBe(0)
	})

	test('with a short password fails and returns an error message', async () => {
		const newUser = { username: 'badjoe', name: 'joe', password: '12' }
		const res = await api.post('/api/users').send(newUser)
		const users = await usersInDb()

		expect(res.statusCode).toBe(400)
		expect(res.body.error).toMatch(/password.*length/i)
		expect(users.length).toBe(0)
	})

	test('with a non-unique username fails and returns an error message', async () => {
		const newUser = { username: 'goodjoe', name: 'joe', password: '123' }
		await api.post('/api/users').send(newUser)
		const response = await api.post('/api/users').send(newUser)
		const users = await usersInDb()

		expect(response.statusCode).toBe(400)
		expect(response.body.error).toMatch(/username.*unique/i)
		expect(users.length).toBe(1)
	})
})

afterAll( async () => {
	await mongoose.connection.close()
})