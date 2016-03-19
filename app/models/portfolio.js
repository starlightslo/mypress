'use strict'

const Model = require('objection').Model

class Portfolio extends Model {
	static get tableName() {
		return 'portfolios'
	}
}

module.exports = Portfolio