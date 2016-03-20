'use strict'

const config = require('../config')

module.exports = {
	name: 'skills',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
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
		name: 'User Interface',
		percent: 73,
		color: '#35AFBA',
		animate_time: 3000,
		order: 1
	},{
		name: 'Frontend',
		percent: 85,
		color: '#FF6060',
		animate_time: 3000,
		order: 2
	},{
		name: 'Backend',
		percent: 99,
		color: '#3AD079',
		animate_time: 3000,
		order: 3
	},{
		name: 'User Experience',
		percent: 40,
		color: '#58C0E3',
		animate_time: 3000,
		order: 4
	}]
}
