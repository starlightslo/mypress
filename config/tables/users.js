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
		name: 'picture',
		type: 'string',
		length: 256
	},{
		name: 'email',
		type: 'string',
		length: 256
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
		picture: 'images/img.png',
		email: '',
		facebook: '',
		linkedin: '',
		twitter: '',
		google: '',
		flickr: ''
	}]
}
