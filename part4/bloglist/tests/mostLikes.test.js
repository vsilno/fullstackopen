const { mostLikes } = require('../utils/list_helper')

const blogs = [
	{ title: 'Title', author: 'Joe', likes: 3 },
	{ title: 'Tile', author: 'Joe', likes: 1 },
	{ title: 'What', author: 'Brad', likes: 10 },
	{ title: 'Super', author: 'Carl', likes: 1 },
	{ title: 'Hey', author: 'Carl', likes: 4 },
	{ title: 'Winner', author: 'Joe', likes: 1 },
	{ title: 'Blog', author: 'Fred', likes: 7 },
]

describe('calculating most likes', () => {
	test('returns 0 if the array is emtpy', () => {
		const result = mostLikes([])

		expect(result).toBe(0)
	})

	test('of a 1-item array is that author with like count', () => {
		const blog = blogs[0]
		const result = mostLikes([blog])
		const expectedResult = { author: blog.author, likes: blog.likes }

		expect(result).toEqual(expectedResult)
	})

	test('of an array with several blogs returns most liked author', () => {
		const result = mostLikes(blogs)

		expect(result).toEqual({ author: 'Brad', likes: 10 })
	})
})