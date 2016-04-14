'use strict'

const knex = require('knex')
const bcrypt = require('bcryptjs')
const config = require('../../config/config')
const salt = bcrypt.genSaltSync(config.saltLength)

const Language = require('../modules/language')
const verify = new (require('../modules/verify'))()
const Utils = require('../modules/utils')

const UserTable = 'users'
const UserProfileTable = 'user_profiles'
const MenuTable = 'menu'
const ExperienceTable = 'experiences'
const PortfolioTable = 'portfolios'
const SkillTable = 'skills'
const SettingsTable = 'settings'
const LanguageTable = 'languages'
const SystemTable = 'system'

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
	const db = req.app.get('db').adminDB
	let userList = []

	// Getting total count of user data
	db(UserTable).count('*').first()
	.then((data) => {
		// Find the total page
		const totalCount = data.count
		totalPage = Math.ceil(totalCount / PAGE_COUNT)

		// Check the current page
		if (page > totalPage) page = totalPage

		// Getting the offset
		const offset = (page - 1) * PAGE_COUNT

		// Getting user data with limit and offset
		return db(UserTable).innerJoin(UserProfileTable, 'user_profiles.user_id', 'users.id').where('user_profiles.language', language).orderBy('first_name').orderBy('last_name').limit(PAGE_COUNT).offset(offset)
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
	const db = req.app.get('db').adminDB
	let user = {}

	// Getting user data
	db(UserTable).innerJoin(UserProfileTable, 'user_profiles.user_id', 'users.id').where('user_profiles.language', selectedLanguage).where('users.username', username).first()
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
	const db = req.app.get('db').adminDB

	// Insert data
	db(UserTable).returning('id').insert({
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
			promiseList.push(db(UserProfileTable).insert({
				language: lang,
				user_id: user[0],
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
	const db = req.app.get('db').adminDB

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
	db(UserTable).where('username', username).first()
	.then(user => {
		if (user) {
			const uid = user.id
			let promiseList = []
			promiseList.push(db(UserTable).where('id', uid).update(updateUserStructure))
			promiseList.push(db(UserProfileTable).where('user_id', uid).where('language', selectedLanguage).update(updateUserProfileStructure))
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
	const db = req.app.get('db').adminDB
	
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
				db(UserTable).where('users.username', username).update(updateStructure)
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
	const db = req.app.get('db').adminDB

	db(UserTable).where('username', username).first()
	.then(user => {
		if (user) {
			const uid = user.id
			let promiseList = []
			promiseList.push(db(UserTable).where('id', uid).del())
			promiseList.push(db(UserProfileTable).where('user_id', uid).del())
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
	const db = req.app.get('db').adminDB

	// Search user
	db(UserTable).where('username', username).first()
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
	const db = req.app.get('db').adminDB
	let menuList = []

	// Getting menu data
	db(MenuTable).where('language', selectedLanguage).orderBy('order')
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
	const db = req.app.get('db').adminDB

	let promiseList = []
	// Prepare insert data
	languageList.forEach(lang => {
		promiseList.push(db(MenuTable).insert({
			key: key,
			name: name,
			link: link,
			target: target,
			order: order,
			language: lang
		}))
	})

	// Checking is there the same key
	db(MenuTable).where('key', key).count('*').first()
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
	const db = req.app.get('db').adminDB
	let menu = {}

	// Getting user data
	db(MenuTable).where('key', key).where('language', selectedLanguage).first()
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
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		name: name,
		link: link,
		target: target,
		order: order
	}

	// Update the name of menu
	db(MenuTable).where('key', key).where('language', selectedLanguage).update(updateStructure)
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
	const db = req.app.get('db').adminDB
	
	db(MenuTable).where('key', key).del()
	.then(data => {
		
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
	const db = req.app.get('db').adminDB
	let portfolioList = []

	// Getting total count of portfolio data
	db(PortfolioTable).where('language', selectedLanguage).count('*').first()
	.then((data) => {
		// Find the total page
		const totalCount = data.count
		totalPage = Math.ceil(totalCount / PAGE_COUNT)

		// Check the current page
		if (page > totalPage) page = totalPage

		// Getting the offset
		const offset = (page - 1) * PAGE_COUNT

		// Getting portfolio data with limit and offset
		return db(PortfolioTable).where('language', selectedLanguage).orderBy('name').limit(PAGE_COUNT).offset(offset)
	})
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

	const page = req.query.p || 1

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
	const db = req.app.get('db').adminDB
	let portfolio = {}

	// Getting user data
	db(PortfolioTable).where('key', key).where('language', selectedLanguage).first()
	.then(portfolios => {
		if (!portfolios) {
			res.redirect('/' + language + '/admin/portfolio')
			return
		}

		portfolio = {
			key: portfolios.key,
			name: portfolios.name,
			client: portfolios.client,
			role: portfolios.role,
			description: portfolios.description,
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
	const db = req.app.get('db').adminDB
	
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
				db(PortfolioTable).where('key', key).update(updateStructure)
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
	const db = req.app.get('db').adminDB

	// Check the key is existing or not
	const generatingKey = () => {
		const resolver = require('bluebird').defer()
		const loop = () => {
			// Generating the key
			const key = Utils.randomString(8)

			// Start checking
			db(PortfolioTable).where('key', key).count('*').first()
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
			promiseList.push(db(PortfolioTable).insert({
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
	const db = req.app.get('db').adminDB
	
	db(PortfolioTable).where('key', key).del()
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}


exports.editPortfolio = function (req, res, next) {
	const language = req.app.get('language')
	const key = req.params.key
	const selectedLanguage = req.query.lang || language
	const page = req.query.p || 1

	// Getting user data from the input
	const name = req.body.name || ''
	const client = req.body.client || ''
	const role = req.body.role || ''
	const description = req.body.description || ''
	const link = req.body.link || ''
	const target = req.body.target || '_blank'
	const pictureAlt = req.body.picture_alt || ''


	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		name: name,
		client: client,
		role: role,
		description: description,
		link: link,
		target: target,
		picture_alt: pictureAlt
	}

	// Update the name of menu
	db(PortfolioTable).where('key', key).where('language', selectedLanguage).update(updateStructure)
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/portfolio/view/' + key + '?lang=' + selectedLanguage + '&p=' + page)
	})
}


exports.skill = function (req, res, next) {
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
	const currentPath = 'skill'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let skillList = []

	// Getting menu data
	db(SkillTable).where('language', selectedLanguage).orderBy('order')
	.then(skills => {
		skills.forEach(skill => {
			skillList.push({
				key: skill.key,
				name: skill.name,
				percent: skill.percent,
				color: skill.color,
				animateTime: skill.animate_time,
				order: skill.order,
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
			contentPage: 'admin.skill.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			skillList: skillList,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.addSkill = function (req, res, next) {
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
		url: 'admin/skill',
		name: 'skill'
	}]
	const currentPath = 'addSkill'

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
		contentPage: 'admin.skill.add.html',
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


exports.insertSkill = function (req, res, next) {
	const language = req.app.get('language')
	const languageList = req.app.get('languageList')

	// Getting user data from the input
	const name = req.body.name || ''
	const percent = req.body.percent || 0
	const color = req.body.color || '#000000'
	const order = req.body.order || 1

	// Define
	const db = req.app.get('db').adminDB

	// Check the key is existing or not
	const generatingKey = () => {
		const resolver = require('bluebird').defer()
		const loop = () => {
			// Generating the key
			const key = Utils.randomString(8)

			// Start checking
			db(SkillTable).where('key', key).count('*').first()
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
			promiseList.push(db(SkillTable).insert({
				key: key,
				name: name,
				percent: percent,
				color: color,
				animate_time: 3000,
				order: order,
				language: lang
			}))
		})
		return Promise.all(promiseList)
	})
	.then(() => {
			res.redirect('/' + language + '/admin/skill')
		})
	.catch(err => {
		next(err)
	})
}


exports.viewSkill = function (req, res, next) {
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
		url: 'admin/skill?lang=' + selectedLanguage,
		name: 'skill'
	}]
	const currentPath = 'editSkill'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let skill = {}

	// Getting user data
	db(SkillTable).where('key', key).where('language', selectedLanguage).first()
	.then(skills => {
		if (!skills) {
			res.redirect('/' + language + '/admin/skill')
			return
		}

		skill = {
			key: skills.key,
			name: skills.name,
			percent: skills.percent,
			color: skills.color,
			animateTime: skills.animate_time,
			order: skills.order
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
			contentPage: 'admin.skill.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			skill: skill,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.editSkill = function (req, res, next) {
	const language = req.app.get('language')
	const key = req.params.key
	const selectedLanguage = req.query.lang || language

	// Getting user data from the input
	const name = req.body.name || ''
	const percent = req.body.percent || 0
	const color = req.body.color || '#000000'
	const order = req.body.order || 1
	const animateTime = req.body.animate_time || 3000

	// Checking user data
	if ((!verify.username(key, 1, 16)) || (!verify.inNumber(order, 1, 99)) || (!verify.inNumber(order, 1, 99999))) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		name: name,
		percent: percent,
		color: color,
		order: order,
		animate_time: animateTime
	}

	// Update the name of menu
	db(SkillTable).where('key', key).where('language', selectedLanguage).update({name: name})
	.then(data => {
		return db(SkillTable).where('key', key).update(updateStructure)
	})
	.then(data => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/skill/view/' + key + '?lang=' + selectedLanguage)
	})
}


exports.deleteSkill = function (req, res, next) {
	const key = req.params.key

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB
	
	db(SkillTable).where('key', key).del()
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}


exports.experience = function (req, res, next) {
	const DateFormat = require('dateformat')

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
	const currentPath = 'experience'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let experienceList = []

	// Getting total count of experience data
	db(ExperienceTable).where('language', selectedLanguage).count('*').first()
	.then((data) => {
		// Find the total page
		const totalCount = data.count
		totalPage = Math.ceil(totalCount / PAGE_COUNT)

		// Check the current page
		if (page > totalPage) page = totalPage

		// Getting the offset
		const offset = (page - 1) * PAGE_COUNT

		// Getting portfolio data with limit and offset
		return db(ExperienceTable).where('language', selectedLanguage).orderBy('start_working_date', 'desc').orderBy('end_working_date', 'desc').limit(PAGE_COUNT).offset(offset)
	})
	.then(experiences => {
		experiences.forEach(experience => {
			experienceList.push({
				key: experience.key,
				companyName: experience.company_name,
				companyLogo: experience.company_logo,
				role: experience.role,
				description: experience.description,
				startWorkingDate: DateFormat(experience.start_working_date, 'isoDate'),
				endWorkingDate: DateFormat(experience.end_working_date, 'isoDate'),
				stillHere: experience.still_here
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
			contentPage: 'admin.experience.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			experienceList: experienceList,
			pathList: pathList,
			currentPath: currentPath,
			page: page,
			totalPage: totalPage
		}
		res.render(templateFile, resp)
	})
}


exports.addExperience = function (req, res, next) {
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
		url: 'admin/experience?lang=' + selectedLanguage + '&p=' + page,
		name: 'experience'
	}]
	const currentPath = 'addExperience'

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
		contentPage: 'admin.experience.add.html',
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


exports.viewExperience = function (req, res, next) {
	const DateFormat = require('dateformat')

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

	const page = req.query.p || 1

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Setting path
	const pathList = [{
		url: 'admin/experience?lang=' + selectedLanguage + '&p=' + page,
		name: 'experience'
	}]
	const currentPath = 'editExperience'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let experience = {}

	// Getting user data
	db(ExperienceTable).where('key', key).where('language', selectedLanguage).first()
	.then(experiences => {
		if (!experiences) {
			res.redirect('/' + language + '/admin/experience')
			return
		}

		experience = {
			key: experiences.key,
			companyName: experiences.company_name,
			companyLogo: experiences.company_logo,
			role: experiences.role,
			description: experiences.description,
			startWorkingDate: DateFormat(experiences.start_working_date, 'isoDate'),
			endWorkingDate: DateFormat(experiences.end_working_date, 'isoDate'),
			stillHere: experiences.still_here
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
			contentPage: 'admin.experience.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			experience: experience,
			pathList: pathList,
			currentPath: currentPath,
			page: page
		}
		res.render(templateFile, resp)
	})
}

exports.uploadExperiencePicture = function (req, res, next) {
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
	const db = req.app.get('db').adminDB
	
	fs.readFile(req.files.picture.path, function (err, data) {
		const imageName = req.files.picture.name
		// If there's an error
		if(!imageName){
			next('error')
		} else {
			const path = config.root + "/public/uploads/experience-" + key
			// write file to public/uploads folder
			fs.writeFile(path, data, function (err) {
				if (err) {
					next(err)
					return
				}

				// Update data
				const updateStructure = {
					company_logo: 'uploads/experience-' + key
				}
				db(ExperienceTable).where('key', key).update(updateStructure)
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


exports.insertExperience = function (req, res, next) {
	const language = req.app.get('language')
	const languageList = req.app.get('languageList')

	// Getting user data from the input
	const companyName = req.body.company_name || ''
	const companyLogo = req.body.company_logo || ''
	const role = req.body.role || ''
	const description = req.body.description || ''
	const startWorkingDate = req.body.start_working_date || new Date()
	const endWorkingDate = req.body.end_working_date || new Date()
	const stillHere = req.body.still_here === 'on' ? true : false || false

	// Checking user data formate
	if ((!verify.isBoolean(stillHere)) || (!verify.isDate(startWorkingDate, 'mm/dd/yyyy'))) {
		res.status(400).send()
		return
	}
	if (!stillHere && (!verify.isDate(endWorkingDate, 'mm/dd/yyyy'))) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Check the key is existing or not
	const generatingKey = () => {
		const resolver = require('bluebird').defer()
		const loop = () => {
			// Generating the key
			const key = Utils.randomString(8)

			// Start checking
			db(ExperienceTable).where('key', key).count('*').first()
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
			promiseList.push(db(ExperienceTable).insert({
				key: key,
				company_name: companyName,
				company_logo: companyLogo,
				role: role,
				description: description,
				start_working_date: startWorkingDate,
				end_working_date: endWorkingDate,
				still_here: stillHere,
				language: lang
			}))
		})
		return Promise.all(promiseList)
	})
	.then(() => {
			res.redirect('/' + language + '/admin/experience')
		})
	.catch(err => {
		next(err)
	})
}


exports.deleteExperience = function (req, res, next) {
	const key = req.params.key

	// Checking user data
	if (!verify.username(key, 1, 16)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB
	
	db(ExperienceTable).where('key', key).del()
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}


exports.editExperience = function (req, res, next) {
	const language = req.app.get('language')
	const key = req.params.key
	const selectedLanguage = req.query.lang || language
	const page = req.query.p || 1

	// Getting user data from the input
	const companyName = req.body.company_name || ''
	const companyLogo = req.body.company_logo || ''
	const role = req.body.role || ''
	const description = req.body.description || ''
	const startWorkingDate = req.body.start_working_date || new Date()
	const endWorkingDate = req.body.end_working_date || new Date()
	const stillHere = req.body.still_here === 'on' ? true : false || false

	// Checking user data formate
	if ((!verify.username(key, 1, 16)) || (!verify.isBoolean(stillHere)) || (!verify.isDate(startWorkingDate, 'mm/dd/yyyy'))) {
		res.status(400).send()
		return
	}
	if (!stillHere && (!verify.isDate(startWorkingDate, 'mm/dd/yyyy'))) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		company_name: companyName,
		role: role,
		description: description
	}
	const updateDateStructure = {
		start_working_date: startWorkingDate,
		end_working_date: endWorkingDate,
		still_here: stillHere
	}

	// Update the name of experience
	db(ExperienceTable).where('key', key).where('language', selectedLanguage).update(updateStructure)
	.then(data => {
		return db(ExperienceTable).where('key', key).update(updateDateStructure)
	})
	.then(data => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/experience/view/' + key + '?lang=' + selectedLanguage + '&p=' + page)
	})
}


exports.settingsLanguage = function (req, res, next) {
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
	const currentPath = 'language'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let settingsLanguageList = []

	// Getting menu data
	db(LanguageTable).orderBy('order')
	.then(languages => {
		languages.forEach(language => {
			settingsLanguageList.push({
				id: language.id,
				name: language.name,
				order: language.order
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
			contentPage: 'admin.settings.language.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			settingsLanguageList: settingsLanguageList,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.addSettingsLanguage = function (req, res, next) {
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
		url: 'admin/settings/language',
		name: 'language'
	}]
	const currentPath = 'addLanguage'

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
		contentPage: 'admin.settings.language.add.html',
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


exports.insertSettingsLanguage = function (req, res, next) {
	const language = req.app.get('language')
	const languageList = req.app.get('languageList')

	// Getting user data from the input
	const order = req.body.order || 1
	const name = req.body.name || ''
	
	// Define
	const db = req.app.get('db').adminDB
	let tableList = []

	// Checking is there the same key
	db(LanguageTable).where('name', name).count('*').first()
	.then(data => {
		if (data.count > 0) {
			next('The language is existing.')
			return
		}

		// Run insert
		return db(LanguageTable).insert({
			order: order,
			name: name
		})
	})
	.then(() => {
		// Getting all supported multiple language tables
		return db(SystemTable).select('multipleLanguageTables').first()
	})
	.then(tables => {
		if (tables) {
			let promiseList = []
			tables['multipleLanguageTables'].forEach(table => {
				// Choose default langauge for base data
				promiseList.push(
					db(table.name).where('language', language)
				)
				tableList.push(table)
			})
			return Promise.all(promiseList)
		}
	})
	.then(results => {
		if (results) {
			let promiseList = []
			// Starting to add new language for each suuported table
			for (let i = 0 ; i < results.length ; i++) {
				const table = tableList[i]
				results[i].forEach(result => {
					delete result[table.primaryKey]
					result[table.langColumn] = name
					promiseList.push(db(table.name).insert(result))
				})
			}
			return Promise.all(promiseList)
		}
	})
	.then(data => {
		res.redirect('/' + language + '/admin/settings/language')
	})
	.catch(err => {
		next(err)
	})
}


exports.deleteSettingsLanguage = function (req, res, next) {
	const id = req.params.id

	// Checking user data
	if (!verify.isNumber(id)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB
	let language = undefined
	
	db(LanguageTable).select('name').where('id', id).first()
	.then(data => {
		// Getting the language
		if (data) {
			language = data['name']
		}

		// Delete the language
		return db(LanguageTable).where('id', id).del()
	})
	.then(() => {
		// Getting all supported multiple language tables
		return db(SystemTable).select('multipleLanguageTables').first()
	})
	.then(tables => {
		if (tables && language) {
			let promiseList = []
			tables['multipleLanguageTables'].forEach(table => {
				// Starting to delete all language in each table
				promiseList.push(
					db(table.name).where('language', language).del()
				)
			})
			return Promise.all(promiseList)
		}
	})
	.then(data => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.status(204).send()
	})
}


exports.viewSettingsLanguage = function (req, res, next) {
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
	const id = req.params.id

	// Checking user data
	if (!verify.isNumber(id)) {
		res.status(400).send()
		return
	}

	// Setting path
	const pathList = [{
		url: 'admin/settings/language',
		name: 'language'
	}]
	const currentPath = 'editLanguage'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let settingsLanguage = {}

	// Getting user data
	db(LanguageTable).where('id', id).first()
	.then(languages => {
		if (!languages) {
			res.redirect('/' + language + '/admin/settings/language')
			return
		}

		settingsLanguage = {
			id: id,
			name: languages.name,
			order: languages.order
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
			contentPage: 'admin.settings.language.view.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			settingsLanguage: settingsLanguage,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.editSettingsLanguage = function (req, res, next) {
	const language = req.app.get('language')
	const id = req.params.id

	// Getting user data from the input
	const order = req.body.order || 1

	// Checking user data
	if (!verify.isNumber(id)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		order: order
	}

	// Update the order of language
	db(LanguageTable).where('id', id).update(updateStructure)
	.then(data => {
		
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/settings/language/view/' + id)
	})
}


exports.validateSettingsLanguage = function (req, res, next) {
	const name = req.params.name

	// Checking user data
	if (verify.isEmpty(name)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Search user
	db(LanguageTable).where('name', name).first()
	.then(language => {
		if (language) {
			res.send('1')
		} else {
			res.send('0')
		}
	})
	.catch(err => {
		next(err)
	})
}


exports.settingsTemplate = function (req, res, next) {
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
	const currentPath = 'template'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let templateList = []

	db(SystemTable).select('template').first()
	.then(data => {
		data['template'].forEach(tmpl => {
			templateList.push({
				name: tmpl.name,
				key: tmpl.key
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
			contentPage: 'admin.settings.template.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			templateList: templateList,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.editSettingsTemplate = function (req, res, next) {
	const language = req.app.get('language')

	// Getting user data from the input
	const key = req.body.key || ''

	// Checking user data
	if (verify.isEmpty(key)) {
		res.status(400).send()
		return
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		template: key
	}

	// Checking the template is in the list
	db(SystemTable).select('template').first()
	.then(data => {
		let installed = false
		data['template'].forEach(tmpl => {
			if (tmpl.key === key) {
				installed = true
			}
		})
		if (installed) {
			return db(SettingsTable).update(updateStructure)
		} else {
			res.status(400).send()
			return
		}
	})
	.then(data => {
		if (data) {
			res.redirect('/' + language + '/admin/settings/template')
		}
	})
	.catch(err => {
		next(err)
	})
}


exports.settingsSystem = function (req, res, next) {
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
	const currentPath = 'system'

	// Get template language data
	const T = Language.getTemplateLanguage(SYSTEM, language)

	// Define
	const db = req.app.get('db').adminDB
	let system = {}

	// Getting menu data
	db(SettingsTable).where('language', selectedLanguage).first()
	.then(data => {
		system = {
			defaultLanguage: data.default_language,
			websiteName: data.website_name,
			webTitle: data.web_title,
			webSubtitle: data.web_subtitle,
			backgroundImage: data.background_image,
			logoString: data.logo_string,
			logoImage: data.logo_image,
			logoLink: data.logo_link,
			mainButtonString: data.main_button_string,
			mainButtonLink: data.main_button_link,
			mainButtonTarget: data.main_button_target
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
			contentPage: 'admin.settings.system.html',
			loginUser: {
				username: req.user.username,
				privilege: req.user.privilege,
				picture: req.user.picture
			},
			system: system,
			pathList: pathList,
			currentPath: currentPath
		}
		res.render(templateFile, resp)
	})
}


exports.editSettingsSystem = function (req, res, next) {
	const language = req.app.get('language')
	const selectedLanguage = req.query.lang || language

	// Getting user data from the input
	const defaultLanguage = req.body.default_language || req.app.get('defaultLanguage')
	const websiteName = req.body.website_name || req.app.get('websiteName')
	const webTitle = req.body.web_title || req.app.get('webTitle')
	const webSubtitle = req.body.web_subtitle || req.app.get('webSubtitle')
	const logoString = req.body.logo_string || req.app.get('logoString')
	const logoLink = req.body.logo_link || req.app.get('logoLink')
	const mainButtonString = req.body.main_button_string || req.app.get('mainButtonString')
	const mainButtonLink = req.body.main_button_link || req.app.get('mainButtonLink')
	const mainButtonTarget = req.body.main_button_target || req.app.get('mainButtonTarget')

	// Checking user data
	if (verify.isEmpty(defaultLanguage)) {
		defaultLanguage = req.app.get('defaultLanguage')
	}

	// Define
	const db = req.app.get('db').adminDB

	// Update structure
	const updateStructure = {
		website_name: websiteName,
		web_title: webTitle,
		web_subtitle: webSubtitle,
		logo_string: logoString,
		logo_link: logoLink,
		main_button_string: mainButtonString,
		main_button_link: mainButtonLink,
		main_button_target: mainButtonTarget
	}

	// Update the default language
	db(SettingsTable).update({default_language: defaultLanguage})
	.then(data => {
		// Update other data
		return db(SettingsTable).where('language', selectedLanguage).update(updateStructure)
	})
	.then(data => {

	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		res.redirect('/' + language + '/admin/settings/system?lang=' + selectedLanguage)
	})
}
