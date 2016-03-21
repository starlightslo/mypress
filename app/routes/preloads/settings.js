'use strict'

const Config = require('../../../config/config')
const Settings = require('../../models/settings')
const Language = require('../../models/language')

/**
 * This module will load app's settings from `settings` table and pass to the controllers.
 */
module.exports = function(req, res, next) {
	// Getting language
	const language = req.params.language || req.app.get('defaultLanguage') || Config.language

	// Set table model
	const SettingsModel = Settings.bindKnex(req.app.get('db').normalDB)
	const LanguageModel = Language.bindKnex(req.app.get('db').normalDB)

	// Getting language
	LanguageModel.query().select('name')
	.then(languages => {
		// Setting the language if the language is in the support list
		let hasLanguage = false
		languages.forEach(lang => {
			if (language === lang.name) {
				req.app.set('language', language)
				hasLanguage = true
			}
		})

		// set to the default language if there is no support language
		if (!hasLanguage) {
			req.app.set('language', req.app.get('defaultLanguage') || Config.language)
		}

		console.log('language: ' + req.app.get('language'))
		// Getting settings data according language
		return SettingsModel.query().where('language', req.app.get('language')).first()
	})
	.then(settings => {
		req.app.set('websiteName', settings.website_name)
		req.app.set('template', settings.template)
		req.app.set('defaultLanguage', settings.default_language)
		req.app.set('logoString', settings.logo_string)
		req.app.set('logoImage', settings.logo_image)
		req.app.set('logoLink', settings.logo_link)
		req.app.set('webTitle', settings.web_title)
		req.app.set('webSubtitle', settings.web_subtitle)
		req.app.set('backgroundImage', settings.background_image)
		req.app.set('mainButtonString', settings.main_button_string)
		req.app.set('mainButtonLink', settings.main_button_link)
		req.app.set('mainButtonTarget', settings.main_button_target)
	})
	.finally(() => {
		next()
	})
}