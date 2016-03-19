'use strict'

const Settings = require('../../models/settings')

/**
 * This module will load app's settings from `settings` table and pass to the controllers.
 */
module.exports = function(req, res, next) {
	const SettingsModel = Settings.bindKnex(req.app.get('db').normalDB)
	SettingsModel.query()
	.first()
	.then(settings => {
		req.app.set('websiteName', settings.website_name)
		req.app.set('template', settings.template)
		next()
	})
}