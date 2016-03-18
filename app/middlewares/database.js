'use strict'

// Get config
const config = require('../../config/config')

// Loading database
const db = require('../../config/database')(config.db)

// Define
const ERROR_DATABASE_NOT_EXISTING = 'The database does not existing.'

/*
 * This is the middleware of database, which will set the database instance to the express app.
 */
module.exports = function(req, res, next) {
	// Closing root database connection
	db.rootDB.destroy().then(() => {})

	// Check the database instance
	if (!db.normalDB || !db.adminDB) {
		next(ERROR_DATABASE_NOT_EXISTING)
	} else {
		// Set db into express app
		req.app.set('db', {
			normalDB: db.normalDB,
			adminDB: db.adminDB
		})
		next()
	}
}