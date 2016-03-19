'use strict'

const config = require('../config')

module.exports = {
	name: 'menu',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'name',
		type: 'string',
		length: 64
	},{
		name: 'link',
		type: 'string',
		length: 256
	},{
		name: 'order',
		type: 'integer'
	},{
		name: 'target',
		type: 'text',
		length: 32
	}],
	defaultDataList: [{
		name: 'About',
		link: '#About',
		order: 1,
		target: ''
	},{
		name: 'Portfolio',
		link: '#Portfolio',
		order: 2,
		target: ''
	},{
		name: 'Skills',
		link: '#skills',
		order: 3,
		target: ''
	},{
		name: 'Experience',
		link: '#Experience',
		order: 4,
		target: ''
	}]
}
