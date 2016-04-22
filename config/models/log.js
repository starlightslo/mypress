'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
	ip: String,
	method: String,
	endpoint: String,
	user: Object,
	body: Object,
	timestamp: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Log', LogSchema)