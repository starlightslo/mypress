'use strict'

exports.fullTableSchema = {
	name: 'test',
	columnList: [{
		name: 'col1',
		type: 'increments'
	},{
		name: 'col2',
		type: 'integer'
	},{
		name: 'col3',
		type: 'bigInteger'
	},{
		name: 'col4',
		type: 'text',
	},{
		name: 'col5',
		type: 'text',
		textType: 'mediumtext'
	},{
		name: 'col6',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'col7',
		type: 'string'
	},{
		name: 'col8',
		type: 'string',
		length: 123
	},{
		name: 'col9',
		type: 'float'
	},{
		name: 'col10',
		type: 'decimal'
	},{
		name: 'col11',
		type: 'boolean'
	},{
		name: 'col12',
		type: 'date'
	},{
		name: 'col13',
		type: 'dateTime'
	},{
		name: 'col14',
		type: 'time'
	},{
		name: 'col15',
		type: 'timestamp'
	},{
		name: 'col16',
		type: 'binary'
	},{
		name: 'col17',
		type: 'json'
	},{
		name: 'col18',
		type: 'jsonb'
	},{
		name: 'col19',
		type: 'uuid'
	},{
		name: 'col20',
		type: 'integer',
		default: 999
	},{
		name: 'col21',
		type: 'string',
		default: 'test'
	},{
		name: 'col22',
		type: 'string',
		notNull: true
	}],
	defaultDataList: [{
		col2: 1,
		col3: 2,
		col4: '3',
		col5: '4',
		col6: '5',
		col7: '6',
		col8: '7',
		col9: 8.8,
		col10: 9.9,
		col11: true,
		col12: new Date(),
		col13: new Date(),
		col14: new Date(),
		col15: new Date(),
		col16: 'a',
		col17: {a: 'a'},
		col18: {b: 'b'},
		col19: '18',
		col20: 19,
		col21: '20',
		col22: '21'
	}]
}

exports.addTableSchema = {
	name: 'test',
	columnList: [{
		name: 'col1',
		type: 'increments'
	},{
		name: 'col2',
		type: 'integer'
	},{
		name: 'col3',
		type: 'bigInteger'
	},{
		name: 'col4',
		type: 'text',
	},{
		name: 'col5',
		type: 'text',
		textType: 'mediumtext'
	},{
		name: 'col6',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'col7',
		type: 'string'
	},{
		name: 'col8',
		type: 'string',
		length: 123
	},{
		name: 'col9',
		type: 'float'
	},{
		name: 'col10',
		type: 'decimal'
	},{
		name: 'col11',
		type: 'boolean'
	},{
		name: 'col12',
		type: 'date'
	},{
		name: 'col13',
		type: 'dateTime'
	},{
		name: 'col14',
		type: 'time'
	},{
		name: 'col15',
		type: 'timestamp'
	},{
		name: 'col16',
		type: 'binary'
	},{
		name: 'col17',
		type: 'json'
	},{
		name: 'col18',
		type: 'jsonb'
	},{
		name: 'col19',
		type: 'uuid'
	},{
		name: 'col20',
		type: 'integer',
		default: 999
	},{
		name: 'col21',
		type: 'string',
		default: 'test'
	},{
		name: 'col22',
		type: 'string',
		notNull: true
	},{
		name: 'col23',
		type: 'string'
	}]
}

exports.renameTableSchema = {
	name: 'test',
	columnList: [{
		name: 'col1',
		type: 'increments'
	},{
		name: 'col2',
		type: 'integer'
	},{
		name: 'col3',
		type: 'bigInteger'
	},{
		name: 'col4',
		type: 'text',
	},{
		name: 'col5',
		type: 'text',
		textType: 'mediumtext'
	},{
		name: 'col6',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'col7',
		type: 'string'
	},{
		name: 'col8',
		type: 'string',
		length: 123
	},{
		name: 'col9',
		type: 'float'
	},{
		name: 'col10',
		type: 'decimal'
	},{
		name: 'col11',
		type: 'boolean'
	},{
		name: 'col12',
		type: 'date'
	},{
		name: 'col13',
		type: 'dateTime'
	},{
		name: 'col14',
		type: 'time'
	},{
		name: 'col15',
		type: 'timestamp'
	},{
		name: 'col16',
		type: 'binary'
	},{
		name: 'col17',
		type: 'json'
	},{
		name: 'col18',
		type: 'jsonb'
	},{
		name: 'col19',
		type: 'uuid'
	},{
		name: 'col20',
		type: 'integer',
		default: 999
	},{
		name: 'col21',
		type: 'string',
		default: 'test'
	},{
		name: 'col22',
		type: 'string',
		notNull: true
	},{
		name: 'col23',
		type: 'rename',
		newName: 'col24'
	}]
}

exports.removeTableSchema = {
	name: 'test',
	columnList: [{
		name: 'col1',
		type: 'increments'
	},{
		name: 'col2',
		type: 'integer'
	},{
		name: 'col3',
		type: 'bigInteger'
	},{
		name: 'col4',
		type: 'text',
	},{
		name: 'col5',
		type: 'text',
		textType: 'mediumtext'
	},{
		name: 'col6',
		type: 'text',
		textType: 'longtext'
	},{
		name: 'col7',
		type: 'string'
	},{
		name: 'col8',
		type: 'string',
		length: 123
	},{
		name: 'col9',
		type: 'float'
	},{
		name: 'col10',
		type: 'decimal'
	},{
		name: 'col11',
		type: 'boolean'
	},{
		name: 'col12',
		type: 'date'
	},{
		name: 'col13',
		type: 'dateTime'
	},{
		name: 'col14',
		type: 'time'
	},{
		name: 'col15',
		type: 'timestamp'
	},{
		name: 'col16',
		type: 'binary'
	},{
		name: 'col17',
		type: 'json'
	},{
		name: 'col18',
		type: 'jsonb'
	},{
		name: 'col19',
		type: 'uuid'
	},{
		name: 'col20',
		type: 'integer',
		default: 999
	},{
		name: 'col21',
		type: 'string',
		default: 'test'
	},{
		name: 'col22',
		type: 'string',
		notNull: true
	},{
		name: 'col24',
		type: 'remove'
	}]
}
