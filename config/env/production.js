'use strict'

/**
 * Expose
 */
module.exports = {
	port: process.env.PORT || 8080,
	secret: '123456789012345678901234567890',
	cache: {
		maxage: 86400000	// in milliseconds (one day)
	},
	db: {
		client: 'postgresql',
		host: process.env.POSTGRES_HOST || 'localhost',
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
		},
		rootUser: {
			user: 'postgres',
			password: ''	
		}
	},
	redis: {
		host: process.env.REDIS_HOST || 'localhost',
		port: process.env.REDIS_PORT || 6379,
		db: 0,
		pass: ''
	}
}