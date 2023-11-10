const logger = require('./logger')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		req.token = authorization.replace('Bearer ', '')
	}
	next()
}

const userExtractor = async (req, res, next) => {
	const token = req.token
	const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
	const user = await User.findById(decodedToken.id)

	req.user = user

	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: error.message })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message })
	}

	if (error.name ===  'JsonWebTokenError') {
		return response.status(401).json({ error: 'You must be authenticated to perform this operation' })
	}

	next(error)
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	morgan,
	tokenExtractor,
	userExtractor
}
