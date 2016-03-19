'use strict'

const config = require('../config')

module.exports = {
	name: 'settings',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'website_name',
		type: 'string',
		length: 128
	},{
		name: 'template',
		type: 'string',
		length: 64
	}],
	defaultDataList: [{
		website_name: 'MyPress',
		template: 'default'
	}]
}
