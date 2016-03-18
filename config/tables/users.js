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
	}],
	defaultDataList: [{
		username: 'admin',
		password: bcrypt.hashSync('admin', salt),
		privilege: 99,
		first_name: 'Admin',
		last_name: 'Admin'
	}]
}
