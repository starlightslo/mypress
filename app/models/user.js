'use strict'

const Model = require('objection').Model

class User extends Model {
	static get tableName() {
		return 'users'
	}
}

module.exports = User