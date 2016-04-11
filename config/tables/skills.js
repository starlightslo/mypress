'use strict'

const config = require('../config')

module.exports = {
	name: 'skills',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'key',
		type: 'string',
		length: 16
	},{
		name: 'language',
		type: 'string',
		length: 16
	},{
		name: 'name',
		type: 'string',
		length: 128
	},{
		name: 'percent',
		type: 'integer'
	},{
		name: 'color',
		type: 'string',
		length: 16
	},{
		name: 'animate_time',
		type: 'integer'
	},{
		name: 'order',
		type: 'integer'
	}],
	defaultDataList: [{
		key: 'ui',
		language: 'en',
		name: 'User Interface',
		percent: 73,
		color: '#35AFBA',
		animate_time: 3000,
		order: 1
	},{
		key: 'frontend',
		language: 'en',
		name: 'Frontend',
		percent: 85,
		color: '#FF6060',
		animate_time: 3000,
		order: 2
	},{
		key: 'backend',
		language: 'en',
		name: 'Backend',
		percent: 99,
		color: '#3AD079',
		animate_time: 3000,
		order: 3
	},{
		key: 'ux',
		language: 'en',
		name: 'User Experience',
		percent: 40,
		color: '#58C0E3',
		animate_time: 3000,
		order: 4
	},{
		key: 'ui',
		language: 'tw',
		name: '使用者介面',
		percent: 73,
		color: '#35AFBA',
		animate_time: 3000,
		order: 1
	},{
		key: 'frontend',
		language: 'tw',
		name: '前端',
		percent: 85,
		color: '#FF6060',
		animate_time: 3000,
		order: 2
	},{
		key: 'backend',
		language: 'tw',
		name: '後端',
		percent: 99,
		color: '#3AD079',
		animate_time: 3000,
		order: 3
	},{
		key: 'ux',
		language: 'tw',
		name: '使用者體驗',
		percent: 40,
		color: '#58C0E3',
		animate_time: 3000,
		order: 4
	}]
}
