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
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
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
	const languageList = req.app.get('languageList')
	const templateFile = 'admin'
	const username = req.params.username
	const selectedLanguage = req.query.lang || language

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	let user = {}

	// Getting user data
	UserModel.query().innerJoin('user_profiles', 'user_profiles.user_id', 'users.id').where('user_profiles.language', selectedLanguage).where('users.username', username).first()
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
			selectedLanguage: selectedLanguage,
			languageList: languageList,
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
	if (!verify.username(username, 6, 16) || !verify.password(password, 6, 16) || !verify.inNumber(privilege, 1, 99)) {
		res.status(400).send()
		return
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	const UserProfileModel = UserProfile.bindKnex(req.app.get('db').adminDB)

	// Insert data
	UserModel.query().insert({
		username: username,
		password: bcrypt.hashSync(password, salt),
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
	const language = req.app.get('language')
	const username = req.params.username
	const selectedLanguage = req.query.lang || language

	// Getting user data from the input
	const newPassword = req.body.password || ''
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
	if ((newPassword && !verify.password(newPassword)) || !verify.inNumber(privilege, 1, 99)) {
		res.status(400).send()
		return
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	const UserProfileModel = UserProfile.bindKnex(req.app.get('db').adminDB)

	// Update structrue
	const updateUserStructure = {
		privilege: privilege,
		email: email,
		facebook: facebook,
		linkedin: linkedin,
		twitter: twitter,
		google: google,
		flickr: flickr
	}
	const updateUserProfileStructure = {
		introduction: introduction,
		first_name: firstName,
		last_name: lastName
	}

	if (newPassword) {
		updateStructure['password'] = bcrypt.hashSync(newPassword, salt)
	}
	
	// Update data
	UserModel.query().where('users.username', username).first()
	.then(user => {
		if (user) {
			const uid = user.id
			let promiseList = []
			promiseList.push(UserModel.query().where('id', uid).update(updateUserStructure))
			promiseList.push(UserProfileModel.query().where('user_id', uid).where('language', selectedLanguage).update(updateUserProfileStructure))
			return Promise.all(promiseList)
		}
	})
	.then((data) => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/user/view/' + username + '?lang=' + selectedLanguage)
	})
}

exports.uploadPicture = function (req, res, next) {
	const fs = require('fs')

	const language = req.app.get('language')
	const username = req.params.username
	const selectedLanguage = req.query.lang || language

	if (!req.files) {
		res.status(400).send()
		return
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	
	fs.readFile(req.files.picture.path, function (err, data) {
		const imageName = req.files.picture.name
		// If there's an error
		if(!imageName){
			next('error')
		} else {
			const path = config.root + "/public/uploads/" + username
			// write file to public/uploads folder
			fs.writeFile(path, data, function (err) {
				if (err) {
					next(err)
					return
				}

				// Update data
				const updateStructure = {
					picture: 'uploads/' + username
				}
				UserModel.query().where('users.username', username).update(updateStructure)
				.then(data => {
					
				})
				.catch(err => {
					next(err)
				})
				.finally(() => {
					res.status(204).send()
				})
			})
		}
	})
}

exports.deleteUser = function (req, res, next) {
	const username = req.params.username

	// Checking user data
	if (!verify.username(username, 6, 16)) {
		res.status(400).send()
		return
	}

	// Can not delete self
	if (req.user.username === username) {
		res.status(400).send()
		return
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	const UserProfileModel = UserProfile.bindKnex(req.app.get('db').adminDB)
	
	UserModel.query().where('username', username).first()
	.then(user => {
		if (user) {
			const uid = user.id
			let promiseList = []
			promiseList.push(UserModel.query().delete().where('id', uid))
			promiseList.push(UserProfileModel.query().delete().where('user_id', uid))
			return Promise.all(promiseList)
		}
	})
	.then(() => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}
