'use strict'

const config = require('../config')

module.exports = {
	name: 'skills',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
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
		language: 'en',
		name: 'User Interface',
		percent: 73,
		color: '#35AFBA',
		animate_time: 3000,
		order: 1
	},{
		language: 'en',
		name: 'Frontend',
		percent: 85,
		color: '#FF6060',
		animate_time: 3000,
		order: 2
	},{
		language: 'en',
		name: 'Backend',
		percent: 99,
		color: '#3AD079',
		animate_time: 3000,
		order: 3
	},{
		language: 'en',
		name: 'User Experience',
		percent: 40,
		color: '#58C0E3',
		animate_time: 3000,
		order: 4
	},{
		language: 'tw',
		name: '使用者介面',
		percent: 73,
		color: '#35AFBA',
		animate_time: 3000,
		order: 1
	},{
		language: 'tw',
		name: '前端',
		percent: 85,
		color: '#FF6060',
		animate_time: 3000,
		order: 2
	},{
		language: 'tw',
		name: '後端',
		percent: 99,
		color: '#3AD079',
		animate_time: 3000,
		order: 3
	},{
		language: 'tw',
		name: '使用者體驗',
		percent: 40,
		color: '#58C0E3',
		animate_time: 3000,
		order: 4
	}]
}
