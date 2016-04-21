'use strict'

// Model
const Log = require('../../models/log')

/**
 * This module will log every request.
 */
module.exports = function(req, res, next) {
	// Log
	Log.add({
		ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
		method: req.method,
		endpoint: req.originalUrl,
		user: req.user
	})
	.then(() => {})

	// Do not waiting for log
	next()
}
