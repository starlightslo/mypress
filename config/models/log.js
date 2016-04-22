'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
	ip: String,
	user_agent: String,
	method: String,
	endpoint: String,
	user: Object,
	body: Object,
	type: String,
	action: String,
	detail: Object,
	timestamp: {
		type: Date,
		default: Date.now
	}
})

mongoose.model('Log', LogSchema)