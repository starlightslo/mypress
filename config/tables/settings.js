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
	},{
		name: 'default_language',
		type: 'string',
		length: 16
	},{
		name: 'logo_string',
		type: 'string',
		length: 128
	},{
		name: 'logo_image',
		type: 'string',
		length: 256
	},{
		name: 'logo_link',
		type: 'string',
		length: 256
	},{
		name: 'web_title',
		type: 'string',
		length: 256
	},{
		name: 'web_subtitle',
		type: 'string',
		length: 512
	},{
		name: 'main_button_string',
		type: 'string',
		length: 32
	},{
		name: 'main_button_link',
		type: 'string',
		length: 256
	},{
		name: 'main_button_target',
		type: 'string',
		length: 32
	}],
	defaultDataList: [{
		website_name: 'MyPress',
		template: 'default',
		default_language: config.language,
		logo_string: 'MyPress',
		logo_image: '',
		logo_link: '#',
		web_title: 'PERSONAL & COMPANY',
		web_subtitle: 'MyPress is simply to create a website to introduce yourself',
		main_button_string: 'DOWNLOAD',
		main_button_link: 'https://github.com/starlightslo/mypress',
		main_button_target: ''
	}]
}
