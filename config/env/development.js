'use strict'

/**
 * Expose
 */
module.exports = {
	port: process.env.PORT || 8080,
	secret: '123456789012345678901234567890',
	db: {
		client: 'postgresql',
		host: 'localhost',
		database: 'mypress',
		pool: {
			min: 2,
			max: 10
		},
		normalUser: {
			user: 'postgres',
			password: ''
		},
		adminUser: {
			user: 'postgres',
			password: ''
		}
	}
}