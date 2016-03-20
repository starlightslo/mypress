'use strict'

const config = require('../config')


module.exports = {
	name: 'user_profiles',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'user_id',
		type: 'bigInteger'
	},{
		name: 'language',
		type: 'string',
		length: 16
	},{
		name: 'first_name',
		type: 'string',
		length: 128
	},{
		name: 'last_name',
		type: 'string',
		length: 128
	},{
		name: 'introduction',
		type: 'text',
		textType: 'longtext'
	}],
	defaultDataList: [{
		language: 'en',
		user_id: '1',
		first_name: 'MyPress',
		last_name: '',
		introduction: 'MyPress is simply to create a website to introduce yourself.'
	},{
		language: 'tw',
		user_id: '1',
		first_name: 'MyPress',
		last_name: '',
		introduction: 'MyPress 讓你簡單的創建網站來介紹您自己.'
	}]
}
