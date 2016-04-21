'use strict'

// Get config
const config = require('../../config/config')

// Loading database
const db = require('../../config/database')(config.logDB)

// Define
const ERROR_DATABASE_NOT_EXISTING = 'The log database does not existing.'
const ERROR_DATABASE_DISCONNECTED = 'The log database is disconnected.'

/*
 * This is the middleware of database, which will set the database instance to the express app.
 */
module.exports = function(req, res, next) {
	if (!db.normalDB) {
		next(ERROR_DATABASE_NOT_EXISTING)
	} else {
		// Check state
		if (db.normalDB.connection.readyState !== 1) {
			next(ERROR_DATABASE_DISCONNECTED)
		} else {
			next()
		}
	}
}