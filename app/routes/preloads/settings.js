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
		req.app.set('logoString', settings.logo_string)
		req.app.set('logoImage', settings.logo_image)
		req.app.set('logoLink', settings.logo_link)
		req.app.set('webTitle', settings.web_title)
		req.app.set('webSubtitle', settings.web_subtitle)
		req.app.set('mainButtonString', settings.main_button_string)
		req.app.set('mainButtonLink', settings.main_button_link)
		req.app.set('mainButtonTarget', settings.main_button_target)
		next()
	})
}