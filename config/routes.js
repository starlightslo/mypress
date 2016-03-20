'use strict'

const indexRouter = require('../app/routes/index')

const changeStaticPathForTemplate = (req, res, next) => {
	// Getting the template
	const template = req.app.get('template')

	// Modifing the request url
	req.url = '/' + template + req.url

	next()
}

/**
 * Expose routes
 */
module.exports = function (app) {
	app.use('/', indexRouter)
	app.use('/:language', indexRouter)

	/**
	 * Change the request path for template
	 * IMPORTANT: This should be after all process of routes!!!
	 */
	app.use(changeStaticPathForTemplate)
}