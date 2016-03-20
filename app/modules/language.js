'use strict'

const fs = require('fs')
const path = require('path')
const config = require('../../config/config')

class Language {
	constructor() {

	}

	static getTemplateLanguage(template, language) {
		console.log(template)
		console.log(language)
		let filePath = path.join(config.root, 'app/languages', template + '_' + language + '.js')
		console.log(filePath)
		if (fs.existsSync(filePath)) {
			console.log('exist')
			return require('../languages/' + template + '_' + language)
		} else {
			filePath = path.join(config.root, 'app/languages', template + '.js')
			if (fs.existsSync(filePath)) {
				console.log('default exist')
				return require('../languages/' + template)
			}
		}
		return {}
	}
}


/**
 * Exports
 */
module.exports = Language
