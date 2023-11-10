const { dummy } = require('../utils/list_helper')

test('dummy function', () => {
	const blogs = []

	const result = dummy(blogs)
	expect(result).toBe(1)
})