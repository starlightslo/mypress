'use strict'

const Model = require('objection').Model

class Menu extends Model {
	static get tableName() {
		return 'menu'
	}
}

module.exports = Menu