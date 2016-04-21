'use strict'

const fs = require('fs')
const config = require('./config')
const indexRouter = require('../app/routes/index')
const authRouter = require('../app/routes/auth')
const adminRouter = require('../app/routes/admin')

const Language = require('../app/modules/language')

const removeLastSlash = (req, res, next) => {
	// Removing the last slash and redirect to the new path to prevent the unexpected url link
	if ((req.url.length > 1) && (req.url.endsWith('/'))) {
		req.url = req.url.substring(0, req.url.length-1)
		return res.redirect(req.url)
	}
	next()
}
const changeTemplatePath = (req, res, next) => {
	// Getting the template and language
	const template = req.app.get('settings') ? req.app.get('settings').template : ''

	// Remove the parameters
	let fileUrl = req.url
	if (fileUrl.includes('?')) {
		fileUrl = fileUrl.substring(0, fileUrl.indexOf('?'))
	}

	// If can not find the file
	fs.stat(config.root + '/public' + fileUrl, (err, stat) => {
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
	app.use(removeLastSlash)

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