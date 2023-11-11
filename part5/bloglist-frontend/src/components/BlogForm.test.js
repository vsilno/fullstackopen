import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Form calls the event handle with the right data', async () => {
	const addBlog = jest.fn()
	const user = userEvent.setup()

  const { container } = render(<BlogForm addBlog={addBlog} />)

	const showButton = screen.getByText('new blog')
	await user.click(showButton)

	const title = container.querySelector('#title')
	const author = container.querySelector('#author')
	const url = container.querySelector('#url')
	const submitButton = screen.getByText('create')

  await user.type(title, 'newTitle')
	await user.type(author, 'someAuthor')
	await user.type(url, 'www.url.com')
	await user.click(submitButton)

	const newBlog = addBlog.mock.calls[0][0]

  expect(addBlog.mock.calls).toHaveLength(1)
	expect(newBlog.title).toBe('newTitle')
	expect(newBlog.author).toBe('someAuthor')
	expect(newBlog.url).toBe('www.url.com')
})