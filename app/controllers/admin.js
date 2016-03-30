'use strict'

const bcrypt = require('bcryptjs')
const config = require('../../config/config')
const salt = bcrypt.genSaltSync(config.saltLength)

const Language = require('../modules/language')
const verify = new (require('../modules/verify'))()
const User = require('../models/user')
const UserProfile = require('../models/user_profile')

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
	const username = req.params.username

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	let user = {}

	// Getting user data
	UserModel.query().innerJoin('user_profiles', 'user_profiles.user_id', 'users.id').where('user_profiles.language', language).where('users.username', username).first()
	.then(users => {
		user = {
			username: users.username,
			privilege: users.privilege,
			firstName: users.first_name,
			lastName: users.last_name,
			picture: users.picture,
			email: users.email,
			introduction: users.introduction,
			facebook: users.facebook,
			linkedin: users.linkedin,
			twitter: users.twitter,
			google: users.google,
			flickr: users.flickr
		}
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
			contentPage: 'admin.user.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			user: user
		}
		res.render(templateFile, resp)
	})
}

exports.addUser = function (req, res, next) {
	const languageList = req.app.get('languageList')
	const language = req.app.get('language')

	// Getting user data from the input
	const username = req.body.username || ''
	const password = req.body.password || ''
	const privilege = req.body.privilege || 1
	const firstName = req.body.first_name || ''
	const lastName = req.body.last_name || ''
	const email = req.body.email || ''
	const introduction = req.body.introduction || ''
	const facebook = req.body.facebook || ''
	const twitter = req.body.twitter || ''
	const google = req.body.google || ''
	const linkedin = req.body.linkedin || ''
	const flickr = req.body.flickr || ''

	// Checking user data
	if (!verify.username(username, 6, 16) || !verify.password(password) && !verify.inNumber(privilege, 1, 99)) {
		res.status(400)
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	const UserProfileModel = UserProfile.bindKnex(req.app.get('db').normalDB)

	// Insert data
	UserModel.query().insert({
		username: username,
		password: bcrypt.hashSync('admin', salt),
		privilege: privilege,
		picture: '',
		email: email,
		facebook: facebook,
		linkedin: linkedin,
		twitter: twitter,
		google: google,
		flickr: flickr
	})
	.then(user => {
		console.log(user.id)
		let promiseList = []
		languageList.forEach(lang => {
			promiseList.push(UserProfileModel.query().insert({
				language: lang,
				user_id: user.id,
				first_name: firstName,
				last_name: lastName,
				introduction: introduction
			}))
		})
		return Promise.all(promiseList)
	})
	.then(() => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/user')
	})
}

exports.editUser = function (req, res, next) {

	res.send('edit user')
}

exports.deleteUser = function (req, res, next) {
	res.send('delete user')
}
