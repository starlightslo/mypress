'use strict'

const Model = require('objection').Model

class Experience extends Model {
	static get tableName() {
		return 'experiences'
	}
}

module.exports = Experience