'use strict'

const config = require('../config')

module.exports = {
	name: 'languages',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'name',
		type: 'string',
		length: 16
	},{
		name: 'order',
		type: 'integer'
	}],
	defaultDataList: [{
		name: 'en',
		order: 1
	},{
		name: 'tw',
		order: 2
	}]
}
