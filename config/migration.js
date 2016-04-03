'use strict'

const Promise = require("bluebird")

// Get config
const config = require('./config')

class Migration {
	constructor() {

	}

	static run(tableSchema) {
		// Loading database
		const database = require('./database')(config.db)

		// Closing others database connection
		if (database.normalDB) {
			database.normalDB.destroy().then(() => {})
		}
		if (database.adminDB) {
			database.adminDB.destroy().then(() => {})
		}

		// Check the database instance
		if (database.rootDB) {
			return this.runMigrate(database.rootDB, tableSchema)
		}
		return
	}

	// Set column function
	static setColumn(table, column) {
		let c = null
		switch(column.type) {
			case 'increments':
				c = table.increments(column.name)
				break
			case 'integer':
				c = table.integer(column.name)
				break
			case 'bigInteger':
				c = table.bigInteger(column.name)
				break
			case 'text':
				const TEXT_TYPE_LIST = ['mediumtext', 'longtext']
				if (('textType' in column) && (column.textType in TEXT_TYPE_LIST)) {
					c = table.text(column.name, column.textType)
				} else {
					c = table.text(column.name)
				}
				break
			case 'string':
				if (('length' in column) && !isNaN(column.length)) {
					c = table.string(column.name, column.length)
				} else {
					c = table.string(column.name)
				}
				break
			case 'float':
				if (('precision' in column) && !isNaN(column.precision)) {
					if (('scale' in column) && !isNaN(column.scale)) {
						c = table.float(column.name, column.precision, column.scale)
					} else {
						c = table.float(column.name, column.precision)
					}
				} else {
					c = table.float(column.name)
				}
				break
			case 'decimal':
				if (('precision' in column) && !isNaN(column.length)) {
					if (('scale' in column) && !isNaN(column.scale)) {
						c = table.decimal(column.name, column.precision, column.scale)
					} else {
						c = table.decimal(column.name, column.precision)
					}
				} else {
					c = table.decimal(column.name)
				}
				break
			case 'boolean':
				c = table.boolean(column.name)
				break
			case 'date':
				c = table.date(column.name)
				break
			case 'dateTime':
				c = table.dateTime(column.name)
				break
			case 'time':
				c = table.time(column.name)
				break
			case 'timestamp':
				const STANDARD_LIST = ['timestamptz']
				if (('standard' in column) && (column.standard in STANDARD_LIST)) {
					c = table.timestamp(column.name, column.standard)
				} else {
					c = table.timestamp(column.name)
				}
				break
			case 'binary':
				if (('length' in column) && !isNaN(column.length)) {
					c = table.binary(column.name, column.length)
				} else {
					c = table.binary(column.name)
				}
				break
			case 'json':
				c = table.json(column.name)
				break
			case 'jsonb':
				c = table.jsonb(column.name)
				break
			case 'uuid':
				c = table.uuid(column.name)
				break
			case 'rename':
				if ('newName' in column) {
					table.renameColumn(column.name, column.newName)
				}
				return
			case 'remove':
				table.dropColumn(column.name)
				return
		}

		// Set primary
		if (('primary' in column) && (column.primary === true)) {
			 if (c) c.primary()
		}

		// Set default value
		if (('default' in column)) {
			if (c) c.defaultTo(column.default)
		}
		
		// Set not null
		if (('notNull' in column) && (column.notNull === true)) {
			if (c) c.notNullable()
		} else {
			if (c) c.nullable()
		}
	}

	// Insert data
	static insertData(db, table, dataList) {
		let promiseList = []
		dataList.forEach(data => {
			promiseList.push(db(table).insert(data))
		})
		return Promise.all(promiseList)
	}

	// Migrate function
	static runMigrate(db, tableSchema) {
		const deferred = Promise.defer()

		// Check columns
		if ((!'columnList' in tableSchema) || !Array.isArray(tableSchema.columnList)) {
			return
		}

		// Check the table is existing or not
		db.schema.hasTable(tableSchema.name).then(exists => {
			if (!exists) {
				// Creating new table
				db.schema.createTable(tableSchema.name, table => {
					tableSchema.columnList.forEach(column => {
						this.setColumn(table, column)
					})
				}).then(() => {
					console.log('Creating new table successed.')

					// Insert default value
					if (('defaultDataList' in tableSchema) && (Array.isArray(tableSchema.defaultDataList))) {
						this.insertData(db, tableSchema.name, tableSchema.defaultDataList)
						.then(() => {
							// Closing connection
							return db.destroy()
						})
					} else {
						// Closing connection
						return db.destroy()
					}
				}).then(() => {
					console.log('Closing connection.')
					return deferred.resolve()
				})
			} else {
				// List all column info
				db(tableSchema.name).columnInfo().then(currentColumns => {
					// Check the column is existing or not
					Object.keys(currentColumns).forEach(key => {
						tableSchema.columnList.forEach(column => {
							if (column.name === key) {
								column.exists = true
							}
						})
					})

					// Starting migration
					return db.schema.table(tableSchema.name, table => {
						tableSchema.columnList.forEach(column => {
							if (('exists' in column) && (column.exists === true)) {
								if (column.type === 'remove' || column.type === 'rename') {
									this.setColumn(table, column)
								}
							} else {
								if (column.type !== 'remove') {
									this.setColumn(table, column)
								}
							}
						})
					})
				}).then(() => {
					console.log('Migrating successed.')
					// Closing connection
					return db.destroy()
				}).then(() => {
					console.log('Closing connection.')
					return deferred.resolve()
				})
			}
		}).catch(err => {
			console.log(err)
			return deferred.reject(err)
		})
		return deferred.promise
	}

	static getColumnInfo(table) {
		const deferred = Promise.defer()

		// Loading database
		const database = require('./database')(config.db)

		// Closing others database connection
		if (database.normalDB) {
			database.normalDB.destroy().then(() => {})
		}
		if (database.adminDB) {
			database.adminDB.destroy().then(() => {})
		}

		// Check the database instance
		if (database.rootDB) {
			database.rootDB(table).columnInfo().then(columns => {
				return deferred.resolve(columns)
			})
			return deferred.promise
		} else {
			return
		}
	}

	static dropAll(tableSchemaList) {
		// Loading database
		const database = require('./database')(config.db)

		// Closing others database connection
		if (database.normalDB) {
			database.normalDB.destroy().then(() => {})
		}
		if (database.adminDB) {
			database.adminDB.destroy().then(() => {})
		}

		// Check the input format
		if (!Array.isArray(tableSchemaList)) {
			if (database.rootDB) {
				database.rootDB.destroy().then(() => {})
			}
			return
		} else {
			// Check the database instance
			if (database.rootDB) {
				let promiseList = []
				tableSchemaList.forEach(tableSchema => {
					promiseList.push(database.rootDB.schema.dropTableIfExists(tableSchema.name))
				})
				return Promise.all(promiseList)
			}
		}
	}

	static listData(table) {
		// Loading database
		const database = require('./database')(config.db)


		// Closing others database connection
		if (database.normalDB) {
			database.normalDB.destroy().then(() => {})
		}
		if (database.adminDB) {
			database.adminDB.destroy().then(() => {})
		}

		// Check the database instance
		if (database.rootDB) {
			return database.rootDB.select('*').from(table)
		}
		return
	}
}

/**
 * Exports
 */
module.exports = Migration