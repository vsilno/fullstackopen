const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: (v) => /^\d{2,3}-\d+$/.test(v),
			message: (props) => `${props.value} is not a valid phone number!`
		},
	},
})

personSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id.toString()
		delete obj._id
		delete obj.__v
	}
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person