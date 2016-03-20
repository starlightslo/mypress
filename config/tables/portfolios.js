'use strict'

const config = require('../config')

module.exports = {
	name: 'portfolios',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'name',
		type: 'string',
		length: 128
	},{
		name: 'client',
		type: 'string',
		length: 128
	},{
		name: 'role',
		type: 'string',
		length: 128
	},{
		name: 'description',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'link',
		type: 'string',
		length: 256
	},{
		name: 'target',
		type: 'string',
		length: 32
	},,{
		name: 'picture',
		type: 'string',
		length: 256
	},{
		name: 'picture_alt',
		type: 'string',
		length: 128
	}],
	defaultDataList: [{
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img1.png',
		picture_alt: ''
	},{
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img2.jpg',
		picture_alt: ''
	},{
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img3.jpg',
		picture_alt: ''
	}]
}
