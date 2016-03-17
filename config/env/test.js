'use strict'

/**
 * Expose
 */
module.exports = {
	port: process.env.PORT || 8081,
	secret: '123456789012345678901234567890',
	db: {
		client: 'sqlite3',
		database: './db/test.db'
	}
}