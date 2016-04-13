'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../../config/config')

class Language {
	constructor() {

	}

	static getTemplateLanguage(template, language) {
		let filePath = path.join(config.root, 'app/languages', template + '_' + language + '.js')
		if (fs.existsSync(filePath)) {
			return require('../languages/' + template + '_' + language)
		} else {
			filePath = path.join(config.root, 'app/languages', template + '.js')
			if (fs.existsSync(filePath)) {
				return require('../languages/' + template)
			}
		}
		return {}
	}

	static handleLanguage(req, res, next) {
		let languageList = []
		// Getting language
		const language = req.params.language
		if (language) {
			// Define
			const db = req.app.get('db').normalDB
			const LanguageTable = 'languages'

			// Getting language
			db(LanguageTable).select('name')
			.then(languages => {
				// Setting the language if the language is in the support list
				let hasLanguage = false
				languages.forEach(lang => {
					languageList.push(lang.name)
					if (language === lang.name) {
						req.app.set('language', language)
						hasLanguage = true
					}
				})

				// Store languages into language list
				req.app.set('languageList', languageList)

				// Setting to undefined if there is no support language
				if (!hasLanguage) {
					req.app.set('language', undefined)
				}
				next()
			})
		} else {
			next()
		}
	}

	static removeLanguagePath(req, res, next) {
		// Getting the language
		const language = '/' + req.app.get('language')
		if (language) {
			// Remove the language from path
			if (req.url.startsWith(language)) {
				req.url = req.url.substring(language.length)
			}
		}
		if (req.url.length === 0) {
			req.url = '/'
		}
		next()
	}
}


/**
 * Exports
 */
module.exports = Language
