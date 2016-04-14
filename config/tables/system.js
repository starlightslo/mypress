'use strict'

const config = require('../config')

module.exports = {
	name: 'system',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'multipleLanguageTables',
		type: 'json'
	},{
		name: 'template',
		type: 'json'
	}],
	defaultDataList: [{
		multipleLanguageTables: '[{\
			"name":"user_profiles","langColumn":"language","primaryKey":"id"\
		},{\
			"name":"skills","langColumn":"language","primaryKey":"id"\
		},{\
			"name":"menu","langColumn":"language","primaryKey":"id"\
		},{\
			"name":"portfolios","langColumn":"language","primaryKey":"id"\
		},{\
			"name":"experiences","langColumn":"language","primaryKey":"id"\
		}]',
		template: '[{\
			"name": "Default","key":"default"\
		}]'
	}]
}
