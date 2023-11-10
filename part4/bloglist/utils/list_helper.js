
const dummy = (blogs) => {
	return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
	if (blogs.length === 0) return 0
	const result = [...blogs].reduce((acc, obj) => acc + obj.likes, 0)
	return result ? result : 0
}

const favoriteBlogs = (blogs) => {
	if (blogs.length === 0) return 0
	const result = [...blogs].sort((a, b) => b.likes - a.likes)[0]
	return result
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return 0
	let authorCount = {}
	blogs.forEach((blog) => {
		let count = authorCount[blog.author] || 0
		authorCount[blog.author] = count + 1
	})
	const mostBlogger = Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b)

	const result = { author: mostBlogger, blogs: authorCount[mostBlogger] }

	return result
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return 0
	let authorCount = {}
	blogs.forEach((blog) => {
		let count = authorCount[blog.author] || 0
		authorCount[blog.author] = count + blog.likes
	})

	const mostLiked = Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b)
	const result = {
		author: mostLiked,
		likes: authorCount[mostLiked]
	}

	return result
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlogs,
	mostBlogs,
	mostLikes
}