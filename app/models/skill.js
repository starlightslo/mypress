'use strict'

const Model = require('objection').Model

class Skill extends Model {
	static get tableName() {
		return 'skills'
	}
}

module.exports = Skill