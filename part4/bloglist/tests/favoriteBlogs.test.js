const { favoriteBlogs } = require('../utils/list_helper')

describe('favorite blog', () => {
	test('of an empty list is zero', () => {
		const result = favoriteBlogs([])
		expect(result).toBe(0)
	})

	test('of a 1-length list is that object', () => {
		const blog = { likes: 3, name: 'blog' }
		const result = favoriteBlogs([blog])
		expect(result).toEqual(blog)
	})

	test('of a big list is the most liked blog', () => {
		const result = favoriteBlogs([{ likes: 3, name: 'blog' }], { likes: 1, name: 'ablog' }, { likes: 3, name: 'cblog' })
		expect(result.likes).toBe(3)
	})
})