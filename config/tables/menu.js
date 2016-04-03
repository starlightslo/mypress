'use strict'

const config = require('../config')

module.exports = {
	name: 'menu',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'language',
		type: 'string',
		length: 16
	},{
		name: 'key',
		type: 'string',
		length: 16
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
		language: 'en',
		key: 'about',
		name: 'About',
		link: '#About',
		order: 1,
		target: ''
	},{
		language: 'en',
		key: 'portfolio',
		name: 'Portfolio',
		link: '#Portfolio',
		order: 2,
		target: ''
	},{
		language: 'en',
		key: 'skills',
		name: 'Skills',
		link: '#skills',
		order: 3,
		target: ''
	},{
		language: 'en',
		key: 'experience',
		name: 'Experience',
		link: '#Experience',
		order: 4,
		target: ''
	},{
		language: 'tw',
		key: 'about',
		name: '關於',
		link: '#About',
		order: 1,
		target: ''
	},{
		language: 'tw',
		key: 'portfolio',
		name: '作品',
		link: '#Portfolio',
		order: 2,
		target: ''
	},{
		language: 'tw',
		key: 'skills',
		name: '技能',
		link: '#skills',
		order: 3,
		target: ''
	},{
		language: 'tw',
		key: 'experience',
		name: '經歷',
		link: '#Experience',
		order: 4,
		target: ''
	}]
}
