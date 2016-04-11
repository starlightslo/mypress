'use strict'

const config = require('../config')

module.exports = {
	name: 'portfolios',
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
		key: 'my-press1',
		language: 'en',
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img1.png',
		picture_alt: ''
	},{
		key: 'my-press2',
		language: 'en',
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img2.jpg',
		picture_alt: ''
	},{
		key: 'my-press3',
		language: 'en',
		name: 'MyPress',
		client: 'MyPress',
		role: 'Creator',
		description: 'MyPress is simply to create a website to introduce yourself',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img3.jpg',
		picture_alt: ''
	},{
		key: 'my-press1',
		language: 'tw',
		name: 'MyPress',
		client: 'MyPress',
		role: '創作者',
		description: 'MyPress 讓你簡單的創建網站來介紹您自己',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img1.png',
		picture_alt: ''
	},{
		key: 'my-press2',
		language: 'tw',
		name: 'MyPress',
		client: 'MyPress',
		role: '創作者',
		description: 'MyPress 讓你簡單的創建網站來介紹您自己',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img2.jpg',
		picture_alt: ''
	},{
		key: 'my-press3',
		language: 'tw',
		name: 'MyPress',
		client: 'MyPress',
		role: '創作者',
		description: 'MyPress 讓你簡單的創建網站來介紹您自己',
		link: 'https://github.com/starlightslo/mypress',
		target: '_blank',
		picture: 'images/img3.jpg',
		picture_alt: ''
	}]
}
