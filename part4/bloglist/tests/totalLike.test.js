const { totalLikes } = require('../utils/list_helper')

describe('total likes', () => {
	test('of an empty list is zero', () => {
		const result = totalLikes([])
		expect(result).toBe(0)
	})

	test('of a single object list is equal to that', () => {
		const result = totalLikes([{ likes: 1 }])
		expect(result).toBe(1)
	})

	test('of a big list is calculated right', () => {
		const result = totalLikes([{ likes: 1 }, { likes: 1 }])
		expect(result).toBe(2)
	})
})

describe('unexpected values', () => {
	test('string returns zero', () => {
		const result = totalLikes('string')
		expect(result).toBe(0)
	})

	test('foreign array returns zero', () => {
		const result = totalLikes([{ noLikes: 1 }])
		expect(result).toBe(0)
	})
})