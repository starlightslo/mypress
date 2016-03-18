'use strict'

const chai = require('chai')
const should = chai.should()

const fullTableSchema = {
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
	}]
}

const addTableSchema = {
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

const renameTableSchema = {
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

const removeTableSchema = {
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

let tableSchemaList = []
tableSchemaList.push(fullTableSchema)

const checkColumns = (originalList, checkList) => {
	originalList.forEach(column => {
		let checked = false
		let exist = false
		let name = column.name
		// Check rename
		if (column.type === 'rename') {
			name = column.newName
		}
		Object.keys(checkList).forEach(key => {
			if (name === key) {
				exist = true
				if ((checkList[key].type.toLowerCase() === column.type.toLowerCase())
				 || ((column.type === 'increments') && (checkList[key].type === 'integer'))
				 || ((column.type === 'bigInteger') && (checkList[key].type === 'bigint'))
				 || ((column.type === 'string') && (checkList[key].type === 'varchar'))
				 || ((column.type === 'decimal') && (checkList[key].type === 'float'))
				 || ((column.type === 'timestamp') && (checkList[key].type === 'datetime'))
				 || ((column.type === 'binary') && (checkList[key].type === 'blob'))
				 || ((column.type === 'json') && (checkList[key].type === 'text'))
				 || ((column.type === 'jsonb') && (checkList[key].type === 'undefined'))
				 || ((column.type === 'uuid') && (checkList[key].type === 'char'))
				 || (column.type === 'rename')) {

					checked = true

				 	// Check length
				 	if ('length' in column) {
				 		if (column.length !== parseInt(checkList[key].maxLength, 10)) {
				 			checked = false
				 			console.log(key)
							console.log(checkList[key].defaultValue + '   ' + column.default)
				 		}
				 	}

				 	// Check default value
				 	if ('default' in column) {
				 		should.exist(checkList[key].defaultValue)
				 	} else {
				 		should.not.exist(checkList[key].defaultValue)
				 	}

				 	// Check nullable
				 	if (('notNull' in column) && (column.notNull === true) || (column.type === 'increments')) {
				 		checkList[key].nullable.should.equal(false)
				 	} else {
						checkList[key].nullable.should.equal(true)
				 	}

				} else {
					console.log(key)
					console.log(checkList[key].type + '   ' + column.type)
				}
			}
		})

		// Check `exist` if the type is remove
		if (column.type === 'remove') {
			exist.should.equal(false)
		} else {
			checked.should.equal(true)
		}
	})
}

describe('Database Migration', function() {
	before(function() {
		
	})

	it('Drop all tables', function(done) {
		new (require('../config/migration'))().dropAll(tableSchemaList)
		done()
	})

	it('Test table schema with wrong structure', function(done) {
		new (require('../config/migration'))().run({})
		done()
	})

	it('Test null table schema', function(done) {
		new (require('../config/migration'))().run([{}])
		new (require('../config/migration'))().run([{name: 'test'}])
		new (require('../config/migration'))().run([{name: 'test', columnList: {}}])
		new (require('../config/migration'))().run([{name: 'test', columnList: 'aaa'}])
		new (require('../config/migration'))().run([{columnList: 'aaa'}])
		done()
	})

	it('Create a new table', function(done) {
		const migration = new (require('../config/migration'))()
		// Running migration
		migration.run(fullTableSchema).then(() => {
			// Get columns info and check format
			const getColumnInfo = migration.getColumnInfo(fullTableSchema.name)
			should.exist(getColumnInfo)
			getColumnInfo.then((columns) => {
				checkColumns(fullTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Add column', function(done) {
		const migration = new (require('../config/migration'))()
		// Running migration
		migration.run(addTableSchema).then(() => {
			// Get columns info and check format
			const getColumnInfo = migration.getColumnInfo(addTableSchema.name)
			should.exist(getColumnInfo)
			getColumnInfo.then((columns) => {
				checkColumns(addTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Rename column', function(done) {
		const migration = new (require('../config/migration'))()
		// Running migration
		migration.run(renameTableSchema).then(() => {
			// Get columns info and check format
			const getColumnInfo = migration.getColumnInfo(renameTableSchema.name)
			should.exist(getColumnInfo)
			getColumnInfo.then((columns) => {
				checkColumns(renameTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Remove column', function(done) {
		const migration = new (require('../config/migration'))()
		// Running migration
		migration.run(removeTableSchema).then(() => {
			// Get columns info and check format
			const getColumnInfo = migration.getColumnInfo(removeTableSchema.name)
			should.exist(getColumnInfo)
			getColumnInfo.then((columns) => {
				checkColumns(removeTableSchema.columnList, columns)
				done()
			})
		})
	})

})