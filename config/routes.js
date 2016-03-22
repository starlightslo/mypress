'use strict'

const fs = require('fs')
const config = require('./config')
const indexRouter = require('../app/routes/index')
const authRouter = require('../app/routes/auth')
const adminRouter = require('../app/routes/admin')

const Language = require('../app/modules/language')


const changeTemplatePath = (req, res, next) => {
	// Getting the template and language
	const template = req.app.get('template')

	// If can not find the file
	fs.stat(config.root + '/public' + req.url, (err, stat) => {
		if (err && template) {
			// Modifing the request url
			req.url = '/' + template + req.url
		}
		next()
	})
}

/**
 * Expose routes
 */
module.exports = function (app) {
	/**
	 * Handling the multiple language
	 * IMPORTANT: This should be before all process of routes!!!
	 */
	app.use('/:language', Language.handleLanguage)
	app.use(Language.removeLanguagePath)


	app.use('/', indexRouter)
	app.use('/auth', authRouter)
	app.use('/admin', adminRouter)


	/**
	 * Change the request path for template
	 * IMPORTANT: This should be after all process of routes!!!
	 */
	app.use(changeTemplatePath)
}