'use strict'

const Model = require('objection').Model

class Language extends Model {
	static get tableName() {
		return 'languages'
	}
}

module.exports = Language