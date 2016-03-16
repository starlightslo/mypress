'use strict'

const indexRouter = require('../app/routes/index')


/**
 * Expose routes
 */
module.exports = function (app) {
	app.use('/', indexRouter)
}