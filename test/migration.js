var chai = require('chai')
var should = chai.should()

var tables = require('./data/tables')

var checkColumns = function (originalList, checkList) {
	originalList.forEach(function(column) {
		var checked = false
		var exist = false
		var name = column.name
		// Check rename
		if (column.type === 'rename') {
			name = column.newName
		}
		Object.keys(checkList).forEach(function(key) {
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
		Promise.all([(require('../config/migration')).dropAll([tables.fullTableSchema])]).then(function() {
			done()
		})
	})

	it('Test table schema with wrong structure', function(done) {
		Promise.all([(require('../config/migration')).run({})]).then(function() {
			done()
		})
	})

	it('Test null table schema', function(done) {
		var promiseList = []
		promiseList.push((require('../config/migration')).run([{}]))
		promiseList.push((require('../config/migration')).run([{name: 'test'}]))
		promiseList.push((require('../config/migration')).run([{name: 'test', columnList: {}}]))
		promiseList.push((require('../config/migration')).run([{name: 'test', columnList: 'aaa'}]))
		promiseList.push((require('../config/migration')).run([{columnList: 'aaa'}]))
		Promise.all(promiseList).then(function() {
			done()
		})
	})

	it('Create a new table', function(done) {
		const Migration = (require('../config/migration'))
		// Running migration
		Promise.all([Migration.run(tables.fullTableSchema)]).then(function() {
			// Get columns info and check format
			Migration.getColumnInfo(tables.fullTableSchema.name).then(function(columns) {
				checkColumns(tables.fullTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Checking default value', function(done) {
		var Migration = (require('../config/migration'))
		var result = Migration.listData(tables.fullTableSchema.name)
		should.exist(result)
		result.then(function(rows) {
			rows.length.should.equal(1)
			done()
		})
	})

	it('Add column', function(done) {
		var Migration = (require('../config/migration'))
		// Running migration
		Promise.all([Migration.run(tables.addTableSchema)]).then(function() {
			// Get columns info and check format
			Migration.getColumnInfo(tables.addTableSchema.name).then(function(columns) {
				checkColumns(tables.addTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Rename column', function(done) {
		var Migration = (require('../config/migration'))
		// Running migration
		Promise.all([Migration.run(tables.renameTableSchema)]).then(function() {
			// Get columns info and check format
			Migration.getColumnInfo(tables.renameTableSchema.name).then(function(columns) {
				checkColumns(tables.renameTableSchema.columnList, columns)
				done()
			})
		})
	})

	it('Remove column', function(done) {
		var Migration = (require('../config/migration'))
		// Running migration
		Promise.all([Migration.run(tables.removeTableSchema)]).then(function() {
			// Get columns info and check format
			Migration.getColumnInfo(tables.removeTableSchema.name).then(function(columns) {
				checkColumns(tables.removeTableSchema.columnList, columns)
				done()
			})
		})
	})

})