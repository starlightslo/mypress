'use strict'

const config = require('../../../config/config')
const SettingsTable = 'settings'

/**
 * This module will load app's settings from `settings` table and pass to the controllers.
 */
module.exports = function(req, res, next) {
	// Getting language
	const language = req.app.get('language')
	if (!language) {
		req.app.set('language', req.app.get('settings') ? req.app.get('settings').defaultLanguage : undefined || config.language)
	}

	// Getting server protocol and host
	const protocol = req.get('X-Forwarded-Proto') || req.protocol
	const server = protocol + '://' + req.get('host')

	// Define
	const db = req.app.get('db').normalDB

	// Getting language
	db(SettingsTable).where('language', req.app.get('language')).first()
	.then(settings => {
		const serverSettings = {
			server: server,
			websiteName: settings.website_name,
			template: settings.template,
			defaultLanguage: settings.default_language,
			logoString: settings.logo_string,
			logoImage: settings.logo_image,
			webTitle: settings.web_title,
			webSubtitle: settings.web_subtitle,
			backgroundImage: settings.background_image,
			mainButtonString: settings.main_button_string,
			mainButtonTarget: settings.main_button_target
		}
		req.app.set('settings', serverSettings)
	})
	.finally(() => {
		next()
	})
}