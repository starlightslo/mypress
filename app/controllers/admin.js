'use strict'

const bcrypt = require('bcryptjs')
const config = require('../../config/config')
const salt = bcrypt.genSaltSync(config.saltLength)

const Language = require('../modules/language')
const verify = new (require('../modules/verify'))()
const Utils = require('../modules/utils')

const User = require('../models/user')
const UserProfile = require('../models/user_profile')
const Menu = require('../models/menu')
const Experience = require('../models/experience')
const Portfolio = require('../models/portfolio')
const Skill = require('../models/skill')
const Settings = require('../models/settings')

const SYSTEM = 'system'
const PAGE_COUNT = 10

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

	// Setting path
	const pathList = []
	const currentPath = 'dashboard'

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
		},
		pathList: pathList,
		currentPath: currentPath
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

	// Page
	let totalPage = 1
	let page = req.query.p || 1
	if (!verify.isNumber(page)) page = 1
	page = Number(page)
	if (page < 1) page = 1

	// Setting path
	const pathList = []
	const currentPath = 'user'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	let userList = []

	// Getting total count of user data
	UserModel.query().count('*').first()
	.then((data) => {
		// Find the total page
		const totalCount = data.count
		totalPage = Math.ceil(totalCount / PAGE_COUNT)

		// Check the current page
		if (page > totalPage) page = totalPage

		// Getting the offset
		const offset = (page - 1) * PAGE_COUNT

		// Getting user data with limit and offset
		return UserModel.query().innerJoin('user_profiles', 'user_profiles.user_id', 'users.id').where('user_profiles.language', language).orderBy('first_name').orderBy('last_name').limit(PAGE_COUNT).offset(offset)
	})
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
			userList: userList,
			pathList: pathList,
			currentPath: currentPath,
			page: page,
			totalPage: totalPage
		}
		res.render(templateFile, resp)
	})
}

exports.addUser = function (req, res, next) {
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

	// Setting path
	const pathList = [{
		url: 'admin/user',
		name: 'user'
	}]
	const currentPath = 'addUser'

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
		},
		pathList: pathList,
		currentPath: currentPath
	}
	res.render(templateFile, resp)
}

exports.viewUser = function (req, res, next) {
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

	// Checking user data
	if (!verify.username(username, 6, 16)) {
		res.status(400).send()
		return
	}

	// Setting path
	const pathList = [{
		url: 'admin/user',
		name: 'user'
	}]
	const currentPath = 'editUser'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)
	let user = {}

	// Getting user data
	UserModel.query().innerJoin('user_profiles', 'user_profiles.user_id', 'users.id').where('user_profiles.language', selectedLanguage).where('users.username', username).first()
	.then(users => {
		if (!users) {
			res.redirect('/' + language + '/admin/user')
			return
		}

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
			user: user,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}

exports.insertUser = function (req, res, next) {
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
	if (!verify.username(username, 6, 16)) {
		res.status(400).send()
		return
	}

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

	// Checking user data
	if (!verify.username(username, 6, 16)) {
		res.status(400).send()
		return
	}

	// Checking files data
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


exports.validateUser = function (req, res, next) {
	const username = req.params.username

	// Checking user data
	if (!verify.username(username, 6, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const UserModel = User.bindKnex(req.app.get('db').adminDB)

	// Search user
	UserModel.query().where('username', username).first()
	.then(user => {
		if (user) {
			res.send('1')
		} else {
			res.send('0')
		}
	})
	.catch(err => {
		next(err)
	})
}


exports.menu = function (req, res, next) {
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
	const selectedLanguage = req.query.lang || language

	// Setting path
	const pathList = []
	const currentPath = 'menu'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').adminDB)
	let menuList = []

	// Getting menu data
	MenuModel.query().where('language', selectedLanguage).orderBy('order')
	.then(menus => {
		menus.forEach(menu => {
			menuList.push({
				key: menu.key,
				name: menu.name,
				link: menu.link,
				order: menu.order,
				target: menu.target
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
			contentPage: 'admin.menus.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			menuList: menuList,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.addMenu = function (req, res, next) {
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

	// Setting path
	const pathList = [{
		url: 'admin/user',
		name: 'user'
	}]
	const currentPath = 'addMenu'

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
		contentPage: 'admin.menu.add.html',
		loginUser: {
			username: req.user.username,
			privilege: req.user.privilege,
			picture: req.user.picture
		},
		pathList: pathList,
		currentPath: currentPath
	}
	res.render(templateFile, resp)
}


exports.insertMenu = function (req, res, next) {
	const language = req.app.get('language')
	const languageList = req.app.get('languageList')

	// Getting user data from the input
	const key = req.body.key || ''
	const name = req.body.name || ''
	const link = req.body.link || ''
	const target = req.body.target || ''
	const order = req.body.order || 1
	
	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').adminDB)

	let promiseList = []
	// Prepare insert data
	languageList.forEach(lang => {
		promiseList.push(MenuModel.query().insert({
			key: key,
			name: name,
			link: link,
			target: target,
			order: order,
			language: lang
		}))
	})

	// Checking is there the same key
	MenuModel.query().where('key', key).count('*').first()
	.then(data => {
		if (data.count > 0) {
			next('The key is existing.')
			return
		}

		// Run insert
		return Promise.all(promiseList)
	})
	.then(() => {
		res.redirect('/' + language + '/admin/menu')
	})
	.catch(err => {
		next(err)
	})
}


exports.viewMenu = function (req, res, next) {
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
	const key = req.params.key
	const selectedLanguage = req.query.lang || language

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Setting path
	const pathList = [{
		url: 'admin/menu?lang=' + selectedLanguage,
		name: 'menu'
	}]
	const currentPath = 'editMenu'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').adminDB)
	let menu = {}

	// Getting user data
	MenuModel.query().where('key', key).where('language', selectedLanguage).first()
	.then(menus => {
		if (!menus) {
			res.redirect('/' + language + '/admin/menu')
			return
		}

		menu = {
			key: menus.key,
			name: menus.name,
			link: menus.link,
			order: menus.order,
			target: menus.target
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
			languageList: languageList,
			selectedLanguage: selectedLanguage,
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
			contentPage: 'admin.menu.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			menu: menu,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.editMenu = function (req, res, next) {
	const language = req.app.get('language')
	const key = req.params.key
	const selectedLanguage = req.query.lang || language

	// Getting user data from the input
	const name = req.body.name || ''
	const link = req.body.link || ''
	const target = req.body.target || ''
	const order = req.body.order || 1

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').adminDB)

	// Update structure
	const updateStructure = {
		name: name,
		link: link,
		target: target,
		order: order
	}

	// Update the name of menu
	MenuModel.query().where('key', key).where('language', selectedLanguage).update(updateStructure)
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/menu/view/' + key + '?lang=' + selectedLanguage)
	})
}


exports.deleteMenu = function (req, res, next) {
	const key = req.params.key

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').adminDB)
	
	MenuModel.query().delete().where('key', key)
	.then(data => {
		
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


exports.portfolio = function (req, res, next) {
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
	const selectedLanguage = req.query.lang || language

	// Page
	let totalPage = 1
	let page = req.query.p || 1
	if (!verify.isNumber(page)) page = 1
	page = Number(page)
	if (page < 1) page = 1

	// Setting path
	const pathList = []
	const currentPath = 'portfolio'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').adminDB)
	let portfolioList = []

	// Getting portfolio data
	PortfolioModel.query().where('language', selectedLanguage).orderBy('name')
	.then(portfolios => {
		portfolios.forEach(portfolio => {
			portfolioList.push({
				key: portfolio.key,
				name: portfolio.name,
				client: portfolio.client,
				role: portfolio.role,
				description: portfolio.description,
				link: portfolio.link,
				target: portfolio.target,
				picture: portfolio.picture,
				picture_alt: portfolio.picture_alt,
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
			contentPage: 'admin.portfolio.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			portfolioList: portfolioList,
			pathList: pathList,
			currentPath: currentPath,
			page: page,
			totalPage: totalPage
		}
		res.render(templateFile, resp)
	})
}


exports.addPortfolio = function (req, res, next) {
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
	const selectedLanguage = req.query.lang || language

	let page = req.query.p || 1

	// Setting path
	const pathList = [{
		url: 'admin/portfolio?lang=' + selectedLanguage + '&p=' + page,
		name: 'portfolio'
	}]
	const currentPath = 'addPortfolio'

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
		contentPage: 'admin.portfolio.add.html',
		loginUser: {
			username: req.user.username,
			privilege: req.user.privilege,
			picture: req.user.picture
		},
		pathList: pathList,
		currentPath: currentPath,
		page: page
	}
	res.render(templateFile, resp)
}


exports.viewPortfolio = function (req, res, next) {
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
	const key = req.params.key
	const selectedLanguage = req.query.lang || language

	let page = req.query.p || 1

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Setting path
	const pathList = [{
		url: 'admin/portfolio?lang=' + selectedLanguage + '&p=' + page,
		name: 'portfolio'
	}]
	const currentPath = 'editPortfolio'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').adminDB)
	let portfolio = {}

	// Getting user data
	PortfolioModel.query().where('key', key).where('language', selectedLanguage).first()
	.then(portfolios => {
		if (!portfolios) {
			res.redirect('/' + language + '/admin/portfolio')
			return
		}

		portfolio = {
			key: portfolios.key,
			name: portfolios.name,
			name: portfolios.name,
			client: portfolios.client,
			role: portfolios.role,
			description: portfolios.description,
			name: portfolios.name,
			link: portfolios.link,
			target: portfolios.target,
			picture: portfolios.picture,
			pictureAlt: portfolios.picture_alt
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
			languageList: languageList,
			selectedLanguage: selectedLanguage,
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
			contentPage: 'admin.portfolio.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			portfolio: portfolio,
			pathList: pathList,
			currentPath: currentPath,
			page: page
		}
		res.render(templateFile, resp)
	})
}

exports.uploadPortfolioPicture = function (req, res, next) {
	const fs = require('fs')
	const key = req.params.key

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Checking files data
	if (!req.files) {
		res.status(400).send()
		return
	}

	// Define
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').adminDB)
	
	fs.readFile(req.files.picture.path, function (err, data) {
		const imageName = req.files.picture.name
		// If there's an error
		if(!imageName){
			next('error')
		} else {
			const path = config.root + "/public/uploads/portfolio-" + key
			// write file to public/uploads folder
			fs.writeFile(path, data, function (err) {
				if (err) {
					next(err)
					return
				}

				// Update data
				const updateStructure = {
					picture: 'uploads/portfolio-' + key
				}
				PortfolioModel.query().where('key', key).update(updateStructure)
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


exports.insertPortfolio = function (req, res, next) {
	const language = req.app.get('language')
	const languageList = req.app.get('languageList')

	// Getting user data from the input
	const name = req.body.name || ''
	const client = req.body.client || ''
	const role = req.body.role || ''
	const description = req.body.description || ''
	const link = req.body.link || ''

	// Define
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').adminDB)

	// Check the key is existing or not
	const generatingKey = () => {
		const resolver = require('bluebird').defer()
		const loop = () => {
			// Generating the key
			const key = Utils.randomString(8)

			// Start checking
			PortfolioModel.query().where('key', key).count('*').first()
			.then(data => {
				if (data.count > 0) {
					// If there is a same key
					loop()
				}
				resolver.resolve(key)
			})
			.catch(resolver.reject)
		}
		loop()
		return resolver.promise
	}

	generatingKey()
	.then(key => {
		let promiseList = []
		// Prepare insert data
		languageList.forEach(lang => {
			promiseList.push(PortfolioModel.query().insert({
				key: key,
				name: name,
				client: client,
				role: role,
				description: description,
				link: link,
				target: '_blank',
				picture: '',
				picture_alt: '',
				language: lang
			}))
		})
		return Promise.all(promiseList)
	})
	.then(() => {
			res.redirect('/' + language + '/admin/portfolio')
		})
	.catch(err => {
		next(err)
	})
}


exports.deletePortfolio = function (req, res, next) {
	const key = req.params.key

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const PortfolioModel = Portfolio.bindKnex(req.app.get('db').adminDB)
	
	PortfolioModel.query().delete().where('key', key)
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}

