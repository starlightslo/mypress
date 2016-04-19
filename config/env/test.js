'use strict'

/**
 * Expose
 */
module.exports = {
	port: process.env.PORT || 8081,
	secret: '123456789012345678901234567890',
	cache: {
		maxage: 0	// in milliseconds
	},
	db: {
		client: 'sqlite3',
		database: './db/test.db'
	}
}