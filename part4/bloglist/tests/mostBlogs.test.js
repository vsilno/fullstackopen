const { mostBlogs } = require('../utils/list_helper')

const blogs = [
	{ title: 'Title', author: 'Joe' },
	{ title: 'Tile', author: 'Joe' },
	{ title: 'What', author: 'Brad' },
	{ title: 'Super', author: 'Carl' },
	{ title: 'Hey', author: 'Carl' },
	{ title: 'Winner', author: 'Joe' },
	{ title: 'Blog', author: 'Fred' },
]

describe('most blogs', () => {
	test('returns 0 if the array is emtpy', () => {
		const result = mostBlogs([])

		expect(result).toBe(0)
	})

	test('of a 1-item array is that author with blog count of 1', () => {
		const blog = blogs[0]
		const result = mostBlogs([blog])
		const expectedResult = { author: blog.author, blogs: 1 }

		expect(result).toEqual(expectedResult)
	})

	test('of an array with several blogs returns author with most blogs and blog count', () => {
		const blogArray = blogs
		const result = mostBlogs(blogArray)

		expect(result).toEqual({ author: 'Joe', blogs: 3 })
	})
})