'use strict'

const config = require('../config')

module.exports = {
	name: 'settings',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'language',
		type: 'string',
		length: 16
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
		name: 'background_image',
		type: 'string',
		length: 256
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
		language: 'en',
		website_name: 'MyPress',
		template: 'default',
		default_language: config.language,
		logo_string: 'MyPress',
		logo_image: '',
		logo_link: '#',
		web_title: 'PERSONAL & COMPANY',
		web_subtitle: 'MyPress is simply to create a website to introduce yourself',
		background_image: 'images/slider.jpg',
		main_button_string: 'DOWNLOAD',
		main_button_link: 'https://github.com/starlightslo/mypress',
		main_button_target: ''
	},{
		language: 'tw',
		website_name: 'MyPress',
		template: 'default',
		default_language: config.language,
		logo_string: 'MyPress',
		logo_image: '',
		logo_link: '#',
		web_title: '個人 & 公司',
		web_subtitle: 'MyPress 讓你簡單的創建網站來介紹您自己',
		background_image: 'images/slider.jpg',
		main_button_string: '快速下載',
		main_button_link: 'https://github.com/starlightslo/mypress',
		main_button_target: ''
	}]
}
