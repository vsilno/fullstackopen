require('dotenv').config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const MONGODB_URI = (NODE_ENV === 'test' || NODE_ENV === 'development')
	? process.env.MONGODB_URI_TEST
	: process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT
}