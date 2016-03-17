'use strict'

const Knex = require('knex')

/**
 * Expose database
 */
module.exports = function (db) {
	let normalDB = null
	let adminDB = null
	switch(db.client) {
		case 'sqlite3':
			let sqliteConfig = {
				client: db.client,
				connection: {
					filename: db.database
				}
			}
			normalDB = require('knex')(sqliteConfig)
			adminDB = require('knex')(sqliteConfig)
			break
		case 'postgresql':
		case 'mysql':
			let normalConfig = {
				client: db.client,
				connection: {
					host: db.host,
					database: db.database,
					user: db.normalUser.user,
					password: db.normalUser.password
				}
			}
			let adminConfig = {
				client: db.client,
				connection: {
					host: db.host,
					database: db.database,
					user: db.adminUser.user,
					password: db.adminUser.password
				}
			}
			if (db.pool) {
				normalConfig.pool = db.pool
				adminConfig.pool = db.pool
			}
			normalDB = require('knex')(normalConfig)
			adminDB = require('knex')(adminConfig)
			break
		default:
			break
	}
	return {
		normalDB: normalDB,
		adminDB: adminDB
	}
}