import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const currentUser = {
	username: 'id',
	name: 'name'
}

const blog = {
	title: 'Component testing is done with react-testing-library',
	author: 'Jest',
	user: currentUser,
	likes: 0,
	url: 'url'
}

test('renders title and author', () => {
  render(<Blog blog={blog} />)

  const title = screen.getByText('Component testing is done with react-testing-library')
	const author = screen.getByText('Jest')

  expect(title).toBeDefined()
	expect(author).toBeDefined()
})

test('url and likes are not rendered by default', () => {
	const { container } = render(<Blog blog={blog} />)

	const url = container.querySelector('.url')
	const likes = container.querySelector('.likes')

	expect(url).toBeNull()
	expect(likes).toBeNull()
})

test('url and likes are shown after toggling', async () => {
	const { container } = render(<Blog blog={blog} currentUser={currentUser} />)

	const user = userEvent.setup()
	const button = container.querySelector('.show')
	await user.click(button)

	const url = container.querySelector('.url')
	const likes = container.querySelector('.likes')

	expect(url).toBeDefined()
	expect(likes).toBeDefined()
})

test('the event handler is called twice if clicked twice', async () => {
	const mockHandler = jest.fn()

	const { container } = render(<Blog blog={blog} currentUser={currentUser} addLike={mockHandler} />)

	const user = userEvent.setup()
	const button = container.querySelector('.show')
	await user.click(button)
	const addLike = container.querySelector('.like')
	await user.click(addLike)
	await user.click(addLike)

	expect(mockHandler.mock.calls).toHaveLength(2)
})


