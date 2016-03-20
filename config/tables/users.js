'use strict'

const bcrypt = require('bcryptjs')
const config = require('../config')
const salt = bcrypt.genSaltSync(config.saltLength)


module.exports = {
	name: 'users',
	columnList: [{
		name: 'id',
		type: 'increments',
		primary: true
	},{
		name: 'username',
		type: 'string',
		length: 32
	},{
		name: 'password',
		type: 'string',
		length: 512
	},{
		name: 'privilege',
		type: 'integer'
	},{
		name: 'first_name',
		type: 'string',
		length: 128
	},{
		name: 'last_name',
		type: 'string',
		length: 128
	},{
		name: 'picture',
		type: 'string',
		length: 256
	},{
		name: 'email',
		type: 'string',
		length: 256
	},{
		name: 'introduction',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'facebook',
		type: 'string',
		length: '256'
	},{
		name: 'linkedin',
		type: 'string',
		length: '256'
	},{
		name: 'twitter',
		type: 'string',
		length: '256'
	},{
		name: 'google',
		type: 'string',
		length: '256'
	},{
		name: 'flickr',
		type: 'string',
		length: '256'
	}],
	defaultDataList: [{
		username: 'admin',
		password: bcrypt.hashSync('admin', salt),
		privilege: 99,
		first_name: 'MyPress',
		last_name: '',
		picture: 'images/img.png',
		email: '',
		introduction: 'MyPress is simply to create a website to introduce yourself.',
		facebook: '',
		linkedin: '',
		twitter: '',
		google: '',
		flickr: ''
	}]
}
