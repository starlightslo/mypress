'use strict'

const Model = require('objection').Model

class Settings extends Model {
	static get tableName() {
		return 'settings'
	}
}

module.exports = Settings