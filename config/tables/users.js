'use strict'

module.exports = {
	name: 'users',
	columns: [{
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
	}]
}
