'use strict'

const Menu = require('../models/menu')
const User = require('../models/user')
const Experience = require('../models/experience')

exports.index = function (req, res, next) {
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const template = req.app.get('template')
	const templateFile = template + '/index'

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').normalDB)
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	const ExperienceModel = Experience.bindKnex(req.app.get('db').normalDB)
	let userList = []
	let menuList = []
	let experienceMap = new Map()

	// Getting menu data
	MenuModel.query()
	.orderBy('order')
	.then(menus => {
		console.log('in menu')
		menus.forEach(menu => {
			menuList.push({
				name: menu.name,
				link: menu.link,
				target: menu.target,
			})
		})
		return UserModel.query().orderBy('first_name').orderBy('last_name')
	})
	.then(users => {
		console.log('in user')
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
		return ExperienceModel.query().orderBy('start_working_date', 'desc').orderBy('end_working_date', 'desc')
	})
	.then(experiences => {
		console.log('in experience')
		experiences.forEach(experience => {
			// Getting the year of experience
			let year = (new Date()).getFullYear()
			if (!experience.still_here) {
				year = experience.end_working_date.getFullYear()
			}
			
			// Getting experiences from the list
			let experienceList = []
			if (experienceMap.has(year)) {
				experienceList = experienceMap.get(year)
			}

			// Adding a new experience
			experienceList.push({
				companyName: experience.company_name,
				companyLogo: experience.company_logo,
				role: experience.role,
				description: experience.description,
				startWorkingDate: experience.start_working_date,
				endWorkingDate: experience.end_working_date,
				stillHere: experience.still_here
			})

			// Writing to the experience map
			experienceMap.set(year, experienceList)
		})
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		console.log('in finally')
		
		// Transfer map to the object, because swig dese not support map
		let experiences = {}
		experienceMap.forEach((value, key) => {
			experiences[key] = value
		})

		const resp = {
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
			menuList: menuList,
			userList: userList,
			experiences: experiences
		}
		res.render(templateFile, resp)
	})
}
