'use strict'

/**
 * Expose
 */
module.exports = {
	port: process.env.PORT || 8080,
	secret: '123456789012345678901234567890',
	cache: {
		maxage: 0	// in milliseconds
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
	logDB: {
		client: 'mongodb',
		host: process.env.MONGODB_HOST || 'localhost',
		database: 'mypress',
		port: process.env.MONGODB_PORT || 27017,
		normalUser: {
			user: '',
			password: ''
		}
	}
}