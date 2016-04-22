'use strict'

const _ = require('underscore')

const REQUEST = 'Request'
const SUCCESS = 'Success'

// Model
const Log = require('../../models/log')

/**
 * This module will log every request.
 */
module.exports = function(req, res, next) {
	// Clone body data
	let body = _.clone(req.body)

	// Remove sensitive data
	if (body && body.password) delete body.password

	// Log
	Log.add({
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		user_agent: req.headers['User-Agent'] || req.get('User-Agent') || '',
		method: req.method,
		endpoint: req.originalUrl,
		user: req.user,
		body: body,
		type: REQUEST,
		action: SUCCESS,
		detail: ''
	})
	.then(() => {})

	// Do not waiting for log
	next()
}