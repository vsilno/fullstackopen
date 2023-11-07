// DECLARATIONS
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})

const { PORT } = process.env
const url = process.env.MONGODB_URI

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: `${error.message}` })
	}

	next(error)
}

const app = express()

// PRE-MIDDLEWARE
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())


// IMPLEMENTATION

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => res.json(persons))
})

app.get('/info', (req, res) => {
	Person.find({})
		.then(r => {
			res.send(`
        <p>Phonebook has info for ${r.length} people</p>
        <p>${new Date}</p>
      `)
		})
})

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	Person.findById(id)
		.then(p => {
			if (p) {
				res.json(p)
			} else {
				res.status(404).end()
			}
		})
		.catch((e) => {
			next(e)
		})
})

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	Person.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end()
		})
		.catch((e) => {
			next(e)
		})
})

app.post('/api/persons/', (req, res, next) => {
	const body = req.body

	const person = new Person({ ...body })

	person.save()
		.then(p => {
			res.json(p)
		})
		.catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
	const { number, id } = req.body
	Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
		.then(r => res.json(r))
		.catch(e => next(e))
})

// POST-MIDDLEWARE
app.use(unknownEndpoint)
app.use(errorHandler)


// INITIALIZATION
console.log('connecting to', url)

mongoose.set('strictQuery',false)
mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})



