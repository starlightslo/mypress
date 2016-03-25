'use strict'

const Language = require('../modules/language')
const User = require('../models/user')

const SYSTEM = 'system'


exports.index = function (req, res, next) {
	const server = req.protocol + '://' + req.get('host')
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const language = req.app.get('language')
	const template = req.app.get('template')
	const templateFile = 'admin'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	const resp = {
		T: T,
		server: server,
		language: language,
		websiteName: websiteName,
		logoString: logoString,
		logoImage: logoImage,
		logoLink: logoLink,
		webTitle: webTitle,
		webSubtitle: webSubtitle,
		mainButtonString: mainButtonString,
		mainButtonLink: mainButtonLink,
		mainButtonTarget: mainButtonTarget,
		template: template,
		contentPage: 'admin.dashboards.html',
		loginUser: {
			username: req.user.username,
			privilege: req.user.privilege,
			picture: req.user.picture
		}
	}
	res.render(templateFile, resp)
}


exports.user = function (req, res, next) {
	const server = req.protocol + '://' + req.get('host')
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const language = req.app.get('language')
	const template = req.app.get('template')
	const templateFile = 'admin'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	let userList = []

	// Getting user data
	UserModel.query().innerJoin('user_profiles', 'user_profiles.user_id', 'users.id').where('user_profiles.language', language).orderBy('first_name').orderBy('last_name')
	.then(users => {
		users.forEach(user => {
			userList.push({
				id: user.id,
				username: user.username,
				privilege: user.privilege,
				firstName: user.first_name,
				lastName: user.last_name,
				picture: user.picture,
				email: user.email,
				introduction: user.introduction,
				facebook: user.facebook,
				linkedin: user.linkedin,
				twitter: user.twitter,
				google: user.google,
				flickr: user.flickr
			})
		})
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		const resp = {
			T: T,
			server: server,
			language: language,
			websiteName: websiteName,
			logoString: logoString,
			logoImage: logoImage,
			logoLink: logoLink,
			webTitle: webTitle,
			webSubtitle: webSubtitle,
			mainButtonString: mainButtonString,
			mainButtonLink: mainButtonLink,
			mainButtonTarget: mainButtonTarget,
			template: template,
			contentPage: 'admin.user.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			userList: userList
		}
		res.render(templateFile, resp)
	})
}

exports.add = function (req, res, next) {
	const server = req.protocol + '://' + req.get('host')
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const language = req.app.get('language')
	const template = req.app.get('template')
	const templateFile = 'admin'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	const resp = {
		T: T,
		server: server,
		language: language,
		websiteName: websiteName,
		logoString: logoString,
		logoImage: logoImage,
		logoLink: logoLink,
		webTitle: webTitle,
		webSubtitle: webSubtitle,
		mainButtonString: mainButtonString,
		mainButtonLink: mainButtonLink,
		mainButtonTarget: mainButtonTarget,
		template: template,
		contentPage: 'admin.user.add.html',
		loginUser: {
			username: req.user.username,
			privilege: req.user.privilege,
			picture: req.user.picture
		}
	}
	res.render(templateFile, resp)
}

exports.view = function (req, res, next) {
	const server = req.protocol + '://' + req.get('host')
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const language = req.app.get('language')
	const template = req.app.get('template')
	const templateFile = 'admin'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	const resp = {
		T: T,
		server: server,
		language: language,
		websiteName: websiteName,
		logoString: logoString,
		logoImage: logoImage,
		logoLink: logoLink,
		webTitle: webTitle,
		webSubtitle: webSubtitle,
		mainButtonString: mainButtonString,
		mainButtonLink: mainButtonLink,
		mainButtonTarget: mainButtonTarget,
		template: template,
		contentPage: 'admin.user.view.html',
		loginUser: {
			username: req.user.username,
			privilege: req.user.privilege,
			picture: req.user.picture
		}
	}
	res.render(templateFile, resp)
}

exports.addUser = function (req, res, next) {
	next()
}

exports.deleteUser = function (req, res, next) {
	next()
}
