'use strict'

// Get config
const config = require('../../config/config')

// Loading database
const db = require('../../config/database')(config.db)


/*
 * This is the middleware of database, which will set the database instance to the express app.
 */
module.exports = function(req, res, next) {
	// Set db into express app
	req.app.set('db', db)
	next()
}