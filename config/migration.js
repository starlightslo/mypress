'use strict'

// Get config
const config = require('./config')

// Loading database
const db = require('./database')(config.db)

module.exports = function(tableSchemaList) {
	// Set column function
	const setColumn = (table, column) => {
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
				c = table.renameColumn(column.name, column.newName)
				break
			case 'remove':
				table.dropColumn(column.name)
				return
		}

		// Set primary
		if (('primary' in column) && (column.primary === true)) {
			c.primary()
		}

		// Set default value
		if (('default' in column)) {
			c.defaultTo(column.default)
		}
		
		// Set not null
		if (('notNull' in column) && (column.notNull === true)) {
			c.notNullable()
		} else {
			c.nullable()
		}
	}

	// Migrate function
	const runMigrate = tableSchema => {
		// Check the table is existing or not
		db.rootDB.schema.hasTable(tableSchema.name).then(exists => {
			if (!exists) {
				// Creating new table
				db.rootDB.schema.createTable(tableSchema.name, table => {
					tableSchema.columns.forEach(column => {
						setColumn(table, column)
					})
				}).then(() => {
					console.log('Creating new table successed.')
					// Insert default value

					// Closing connection
					return db.rootDB.destroy()
				}).then(() => {
					console.log('Closing connection.')
				})
			} else {
				// List all column info
				db.rootDB(tableSchema.name).columnInfo().then(currentColumns => {
					// Check the column is existing or not
					Object.keys(currentColumns).forEach(key => {
						tableSchema.columns.forEach(column => {
							if (column.name === key) {
								column.exists = true
							}
						})
					})

					// Starting migration
					return db.rootDB.schema.table(tableSchema.name, table => {
						tableSchema.columns.forEach(column => {
							if (('exists' in column) && (column.exists === true)) {
								if (column.type === 'remove') {
									setColumn(table, column)
								}
							} else {
								if (column.type !== 'remove') {
									setColumn(table, column)
								}
							}
						})
					})
				}).then(() => {
					console.log('Migrating successed.')
					// Closing connection
					return db.rootDB.destroy()
				}).then(() => {
					console.log('Closing connection.')
				})
			}
		})
	}

	// Check the database instance
	if (db.rootDB) {
		tableSchemaList.forEach(tableSchema => {
			runMigrate(tableSchema)
		})
	}

	// Closing others database connection
	db.normalDB.destroy().then(() => {})
	db.adminDB.destroy().then(() => {})
}