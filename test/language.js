'use strict'

const proxyquire = require('proxyquire')

const Language = require('../app/modules/language')
const chai = require('chai')
const should = chai.should()
const assert = chai.assert

const SystemENLanguage = require('../app/languages/system')
const SystemTWLanguage = require('../app/languages/system_tw')
const DefaultENLanguage = require('../app/languages/default')
const DefaultTWLanguage = require('../app/languages/default_tw')

describe('Language', function() {
	let data = {
		db: {
			normalDB: table => {
				return {
					select: function(data) {
						return this
					},
					then: function(callback) {
						return callback([{name: 'en'}, {name: 'tw'}])
					}
				}
			}
		}
	}

	before(function() {

	})

	it('Testing get the template language', function(done) {
		Language.getTemplateLanguage(null, null).should.deep.equal({})
		Language.getTemplateLanguage(null, 'aa').should.deep.equal({})
		Language.getTemplateLanguage('aa', null).should.deep.equal({})
		Language.getTemplateLanguage(null, 'en').should.deep.equal({})

		Language.getTemplateLanguage('system', null).should.deep.equal(SystemENLanguage)
		Language.getTemplateLanguage('system', 'xxx').should.deep.equal(SystemENLanguage)
		Language.getTemplateLanguage('system', 'en').should.deep.equal(SystemENLanguage)
		Language.getTemplateLanguage('system', 'tw').should.deep.equal(SystemTWLanguage)

		Language.getTemplateLanguage('default', null).should.deep.equal(DefaultENLanguage)
		Language.getTemplateLanguage('default', 'xxx').should.deep.equal(DefaultENLanguage)
		Language.getTemplateLanguage('default', 'en').should.deep.equal(DefaultENLanguage)
		Language.getTemplateLanguage('default', 'tw').should.deep.equal(DefaultTWLanguage)

		done()
	})

	it('Testing handle language', function(done) {
		let req = {
			params: {},
			app: {
				set: (key, value) => {
					data[key] = value
				},
				get: (key) => {
					return data[key]
				}
			}
		}
		const checkLanguage = () => {
			return new Promise((resolve, reject) => {
				Language.handleLanguage(req, '', () => {
					resolve(req.app.get('language'))
				})
			})
		}

		checkLanguage().then((lang) => {
			assert.typeOf(lang, 'undefined')
			req.params.language = undefined
			return checkLanguage()
		}).then((lang) => {
			assert.typeOf(lang, 'undefined')
			req.params.language = 'en'
			return checkLanguage()
		}).then((lang) => {
			assert.equal(lang, 'en')
			req.params.language = 'tw'
			return checkLanguage()
		}).then((lang) => {
			assert.equal(lang, 'tw')
			req.params.language = 'xx'
			return checkLanguage()
		}).then((lang) => {
			assert.typeOf(lang, 'undefined')
			done()
		})
	})

	it('Testing remove language path', function(done) {
		let req = {
			url: '',
			params: {},
			app: {
				set: (key, value) => {
					data[key] = value
				},
				get: (key) => {
					return data[key]
				}
			}
		}
		const checkPath = () => {
			return new Promise((resolve, reject) => {
				Language.removeLanguagePath(req, '', () => {
					resolve(req.url)
				})
			})
		}

		checkPath().then((url) => {
			url.should.equal('/')
			req.url = '/'
			return checkPath()
		}).then((url) => {
			url.should.equal('/')
			req.url = '/aaa'
			return checkPath()
		}).then((url) => {
			url.should.equal('/aaa')
			req.url = '/en/aaa'
			return checkPath()
		}).then((url) => {
			url.should.equal('/en/aaa')
			req.url = '/'
			req.app.set('language', 'en')
			return checkPath()
		}).then((url) => {
			url.should.equal('/')
			req.url = '/en/aaa'
			return checkPath()
		}).then((url) => {
			url.should.equal('/aaa')
			req.url = '/tw/aaa'
			return checkPath()
		}).then((url) => {
			url.should.equal('/tw/aaa')
			req.url = '/tw/tw/tw'
			req.app.set('language', 'tw')
			return checkPath()
		}).then((url) => {
			url.should.equal('/tw/tw')
			done()
		})
	})
})